import '../styles/App.css'
import {Layout} from "antd";
import TaskList from "./pages/TaskPage.tsx";


const { Header, Content } = Layout;

function App() {

  const headerStyle: React.CSSProperties = {
    textAlign: 'center',
    color: '#fff',
    height: 64,
    paddingInline: 48,
    lineHeight: '64px',
    backgroundColor: '#4096ff',
  };

  const contentStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center'
  };

  return (
    <Layout >
      <Header style={headerStyle}></Header>
      <Content style={contentStyle}><TaskList/></Content>
      {/*<Footer style={footerStyle}></Footer>*/}
    </Layout>
  )
}

export default App
