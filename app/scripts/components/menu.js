/**
 * This file will hold the Menu that lives at the top of the Page, this is all rendered using a React Component...
 * 
 */
import React from 'react';
import axios from 'axios';
import Search from './search';
import SearchShowAll from './searchShowAll';
import { URI } from '../../../config/general.config';

class Menu extends React.Component {

    /**
     * Main constructor for the Menu Class
     * @memberof Menu
     */
    constructor() {
        super();
        this.state = {
            searchVal:'',
            showingSearch: false,
            data:[],
            results:[],
            showAll:false,
            isExtended:false            
        };
        this.onClickShowAll = this.onClickShowAll.bind(this);
    }

    /**
     * Get data from API backend node server
     * @memberof SearchShowAll,Search
     * @param property.url - get url from property.js 
     */

    componentDidMount(){ 
        const req = axios.get(`${URI}/api?products`)
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
            showingSearch: !this.state.showingSearch,
            searchVal:'',
            results:[],
            showAll:false        
        });
        
    }

    /**
     * Shows or hides the SearchShowAll container
     * @memberof SearchShowAll
     * @param val  - get value from  SearchShowAll container
     */
    
    onClickShowAll(val){        
        this.setState({showAll:val});  
    }

    /**
     * Calls upon search change
     * @memberof Menu,SearchShowAll,Search
     * @param e [Object] - the event from a text change handler
     */

  
    onSearch(e) {       
        this.setState({searchVal : e.target.value.toLowerCase()}, () => {
            let search_val = this.state.searchVal.trim();           
            if(search_val.length === 0) {
                this.setState({results:[],
                    showAll:false
                });
            }else{
                    const regex = new RegExp(search_val,'i');
                    let results = this.state.data.sort().filter(val => regex.test(val.name.toLowerCase().trim()));
                    this.setState({results});
            }
        });        
        
    }
     /**
     * Shows or hides menu extended property
     * @memberof Menu
     * @param e [Object] - the event from a click handler
     */

    menuExtend(e){
        this.setState({
            isExtended: !this.state.isExtended
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
                            <div className={(this.state.isExtended ? "showing " : "")+"menu-ex"}>
                            <a href="#" className= "nav-item">HOLIDAY</a>
                            <a href="#" className="nav-item">WHAT'S NEW</a>
                            <a href="#" className="nav-item">PRODUCTS</a>
                            <a href="#" className="nav-item">BESTSELLERS</a>
                            <a href="#" className="nav-item">GOODBYES</a>
                            <a href="#" className="nav-item">STORES</a>
                            <a href="#" className="nav-item">INSPIRATION</a>
                            </div>
                            <a href="#" onClick={(e) => this.showSearchContainer(e)}>
                                <i className="material-icons search">search</i>
                            </a>
                            <a href="#" onClick={(e) => this.menuExtend(e)} >
                            <i className="material-icons menu">menu</i>
                            </a>
                        </nav>
                    </div>
                </div>
                <div className={(this.state.showingSearch ? "showing " : "") + "search-container"}>
                    <input type="text" onChange={(e) => this.onSearch(e)} name="searchVal" value={this.state.searchVal} placeholder="search" />
                    <a href="#" onClick={(e) => this.showSearchContainer(e)}>
                        <i className="material-icons close">close</i>
                    </a>                                         
                    </div>
                   {this.state.showAll && this.state.results.length >0  ?  <SearchShowAll results = {this.state.results} />: 
                    <Search results = {this.state.results} data= {this.state.data} onClickShowAllChild = {this.onClickShowAll}/>
                     }
                    </header>
        );
    }


}


module.exports = Menu;