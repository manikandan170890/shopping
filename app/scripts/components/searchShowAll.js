import React, { Component } from 'react'

export default class SearchShowAll extends Component {
    render() {
        let results = this.props.results;
        return (
            <div className="search-showAll">
                <h1>Search Results</h1>
                <div className="search-show-all-list">                       
                        {results.map((item,index) => {                               
                                return (
                                    
                                    <div key = {index}  >
                                       
                                        <h3>{item.name}</h3>
                                        <ul>
                                        {item.tags.map((tag,indexTag) => {
                                        return (<li key={indexTag}>{tag}</li>)
                                        })}
                                        </ul>
                                        <img src={item.picture} />
                                        <h3 className="price">${item.price}</h3>                                     
                                    </div>
                                        )
                        })}
                    </div>
            </div>
        )
    }
}
