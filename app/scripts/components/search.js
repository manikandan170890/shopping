import React, { Component, Fragment } from 'react'


export default class Search extends Component {  
     
     /**
     * Transfer the value back to parent
     * @memberof show all result
     * @param e [Object] - the event from a click handler
     */
    showAll(e){      
        this.props.onClickShowAllChild(true);
    }

    render() {
    let showingSearch = this.props.showingSearch;
       let results = this.props.results;
       let data = this.props.data;
        return (
            <Fragment>
                {results.length >0 ?  
                        <div  className="search-component" >
                            <div className="search-title">                      
                                {results.length > 0 ? 
                                <h2>Showing {results.slice(0,4).length} of {data.length} RESULTS {" "}
                                <a href = "#" onClick={(e) => this.showAll()} >SEE ALL RESULTS </a> </h2>: ''}  
                                <hr/>
                                    </div> 
                                    <div className="search-list">                       
                                    {results.slice(0,4).map((item,index) => {                               
                                            return (
                                                
                                                <div key = {index}  >
                                                    <a href="#" onClick={(e) => this.onClickItem(item._id)}>
                                                    <img src={item.picture} />
                                                    <h3>{item.name}</h3>
                                                    <ul>
                                                    {item.tags.map((tag,indexTag) => {
                                                    return (<li key={indexTag}>{tag}</li>)
                                                    })}
                                                </ul>
                                                    </a>
                                                </div>
                                                    )
                                    })}
                                    </div>
                                </div>
                    :"" }
                    
            </Fragment>
        )
    }
}
