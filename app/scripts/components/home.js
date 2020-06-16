/**
 * This file will hold the Main content that lives in the main body of the site
 * 
 */
import React from 'react';


class Home extends React.Component {

    /**
     * Renders the default app in the window, we have assigned this to an element called root.
     * 
     * @returns JSX
     * @memberof Home
    */

    productDetails(){
        console.log(this.props.data);
        let item = this.props.data;
        return(<div className="item-detail">      
                <img src={item.picture} />
                    <h3>{item.name}</h3>
                <p>{item.about}</p>
                <h4>{item.price? "$"+item.price : ""}</h4>       
                </div>
        );
    }
    render() {
       
       
        return (
            <section id="home">
                <div className="content">
                    <p>ELC Coding Test...</p>
                    {this.props.data &&
                        <div className="product">
                            {this.productDetails()}
                        </div>
                   }
                  
                </div>
            </section>
        );
    }


}

// Export out the React Component
module.exports = Home;