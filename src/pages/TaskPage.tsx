import {ConfigProvider, Divider, Radio, Skeleton} from "antd";
import Locale from 'antd/locale/ru_RU';
import {
  useGetTasksQuery,
} from "../store/Api/MocksApi/taskApiMocks.ts";
import InfiniteScroll from "react-infinite-scroll-component";
import { useCallback, useEffect, useState } from "react";
import '../../styles/TaskList.scss'
import AddTask from "../components/AddTask.tsx";
import TaskList from "../components/TaskList.tsx";

const TaskPage = () => {


  const [limit, setLimit] = useState(8); // Начинаем с 8
  const [hasMore, setHasMore] = useState(true);
  const [filter, setFilter] = useState<'all' | 'completed' | 'uncompleted' | 'favorite'>('all')



  const { data: tasks, isFetching, isSuccess } = useGetTasksQuery({
    limit: limit,
    offset: 0
  });

  useEffect(() => {
    // Если запрос успешен и есть новые задачи для обработки
    if (isSuccess && tasks) {

      // Если количество уникальных задач меньше лимита,
      // устанавливаем флаг, что больше данных для загрузки нет
      if (tasks.length < limit) {
        setHasMore(false);
      }
    }

  }, [isSuccess, tasks]);


  const loadMoreData = useCallback(() => {
    if (!isFetching && hasMore) {
      setLimit((prevLimit) => prevLimit + 8);
    }
  }, [isFetching, hasMore, limit]);




  return (
    <ConfigProvider locale={Locale}>
      <div className='tasklist-main' id="scrollableDiv">
        <div className='tasklist-main__filters-box'>
          <Radio.Group
            options={[
              { label: "Все", value: "all" },
              { label: "Избранное", value: "favorite" },
              { label: "Выполненные", value: "completed" },
              { label: "Не выполненные", value: "uncompleted" }
            ]}
            value={filter}
            optionType={"button"}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
        <InfiniteScroll
          dataLength={tasks?.length ?? 0}
          next={loadMoreData}
          height='400px'
          hasMore={hasMore && !isFetching}
          loader={<Skeleton paragraph={false} active />}
          endMessage={<Divider plain>Больше нет 🤐</Divider>}
          scrollableTarget="scrollableDiv"
          className='tasklist-main__infinite-scroll'
        >
          <TaskList tasks={tasks ?? []} filter={filter}/>
        </InfiniteScroll>
        <AddTask />
      </div>
    </ConfigProvider>
  );
};

export default TaskPage;
