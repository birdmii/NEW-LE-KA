import Nav from "./Nav"
import styles from '../styles/Layout.module.css'
import Card from "./Card"

const Layout = ({ children }) => {
  return (
    <>
      <Nav />
      <div className={styles.container}>
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </>
  )
}

export default Layout
