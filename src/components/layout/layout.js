import React from "react"
import "../modules/layout.css"
import "../../../node_modules/font-awesome/css/font-awesome.css"
import backgroundImage from "../../images/backgroundNatureNWT.jpg"

import Header from "./header"
import Footer from "./footer"

const Layout = ({ children }) => {
  return (
    <>
      <img
        src={backgroundImage}
        id="backgroundImage"
        alt="backgroundImage.jpg"
      />
      <div id="wholePage">
        <Header />
        {children}
        <Footer />
      </div>
    </>
  )
}

export default Layout
