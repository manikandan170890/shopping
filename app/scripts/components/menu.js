/**
 * This file will hold the Menu that lives at the top of the Page, this is all rendered using a React Component...
 * 
 */
import React from 'react';
import axios from 'axios';
class Menu extends React.Component {

    /**
     * Main constructor for the Menu Class
     * @memberof Menu
     */
    constructor() {
        super();
        this.state = {
            showingSearch: false,
            data:[],
            results:[]
        };
    }

    componentDidMount(){ //API from Node Server
        const req = axios.get('http://localhost:3035/products')
        .then((res) => {
                const data = res.data;
                this.setState({data});
        });        
     }

    /**
     * Shows or hides the search container
     * @memberof Menu
     * @param e [Object] - the event from a click handler
     */
    showSearchContainer(e) {
        e.preventDefault();
        this.setState({
            showingSearch: !this.state.showingSearch           
        });
    }

    /**
     * Calls upon search change
     * @memberof Menu
     * @param e [Object] - the event from a text change handler
     */

  
    onSearch(e) {
        let search_val = e.target.value.toLowerCase();
        // Start Here
        // ...
        if(search_val.length === 0 ) {
            this.setState({results:[]});
        }else{
                const regex = new RegExp(search_val,'i');
                let results = this.state.data.sort().filter(val => regex.test(val.name.toLowerCase()));
                this.setState({results});
        }
        
        
    }
    onClickItem(id){
        let main_data = this.state.data.filter((val)=> (val._id === id));           
        this.props.onClickHandler(main_data[0]);
        this.setState({
            showingSearch: !this.state.showingSearch           
        });
    }

    /**
     * Renders the default app in the window, we have assigned this to an element called root.
     * 
     * @returns JSX
     * @memberof App
    */
    render() {
        return (
            <header className="menu">
                <div className="menu-container">
                    <div className="menu-holder">
                        <h1>ELC</h1>
                        <nav>
                            <a href="#" className="nav-item">HOLIDAY</a>
                            <a href="#" className="nav-item">WHAT'S NEW</a>
                            <a href="#" className="nav-item">PRODUCTS</a>
                            <a href="#" className="nav-item">BESTSELLERS</a>
                            <a href="#" className="nav-item">GOODBYES</a>
                            <a href="#" className="nav-item">STORES</a>
                            <a href="#" className="nav-item">INSPIRATION</a>

                            <a href="#" onClick={(e) => this.showSearchContainer(e)}>
                                <i className="material-icons search">search</i>
                            </a>
                        </nav>
                    </div>
                </div>
                <div className={(this.state.showingSearch ? "showing " : "") + "search-container"}>
                    <input type="text" onChange={(e) => this.onSearch(e)} />
                    <a href="#" onClick={(e) => this.showSearchContainer(e)}>
                        <i className="material-icons close">close</i>
                    </a>
                    <div className="search-title">
                    <h2>DISPLAYING {this.state.results.length} of {this.state.data.length} RESULTS</h2>
                        <hr/>
                        </div> 
                        <div className="search-list">                       
                         {this.state.results.map((item,index) => {
                                return (
                                    <div key = {index}  >
                                        <a href="#" onClick={(e) => this.onClickItem(item._id)}>
                                        <img src={item.picture} />
                                         <h3>{item.name}</h3>
                                        <p>{item.about.substr(0,50)}</p>
                                        <h4>${item.price}</h4>
                                        </a>
                                     </div>
                                        )
                         })}
                        </div>
                       
                    </div>
                            </header>
        );
    }


}

// Export out the React Component
module.exports = Menu;