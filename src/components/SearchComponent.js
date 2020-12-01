import React, {Component} from 'react';

import './common.css';

class SearchComponent extends Component{

    state = {
        details: [],
        searchString: ''
    }

    /* data from API for reference
    "Geonosis" - "100000000000"
    "Utapau" - "95000000"
    "Mustafar" - "20000"
    "Kashyyyk" - "45000000"
    "Polis Massa" - "1000000"
    "Mygeeto" - "19000000"
    "Felucia" - "8500000"
    "Cato Neimoidia" - "10000000"
    "Saleucami" - "1400000000"
    "Stewjon" - "unknown"    
    */
    componentDidMount = () => {
        let details;
        let id = 0;
        //fetch('http://swapi.dev/api/planets/')
        fetch('http://swapi.dev/api/planets/?page=2')
        .then(response => response.json())
        .then(data => {
            details = data.results.reduce( (arr, element) => {
                id += 1;
                const ob = {PlanetName: element.name, population: element.population, id: id}
                arr.push(ob)
                return arr;
                }, []);
            this.setState({details: details});

        });
    }

    searchStringhandler = (e) => {
        this.setState({searchString: e.target.value});
    }

    logout = () => {
        this.props.history.push('/logout');
    }
    render(){
        const {username} = this.props.match.params;
        const list = this.state.details.filter(el => {
            if (this.state.searchString !== '' && el.PlanetName.toLowerCase().includes(this.state.searchString.toLowerCase()))
                return true
            else
                return false
        }).map(el => {
            //const px = (el.population/10000000000) + "px"
            const px = el.population.toString().length + 5 + "px"
            return <li key={el.id}><span style={{ "font-size": px }}>{el.PlanetName}</span></li>
        });

        return(
            <div className="box">
                <div className="container">
                    <h2>Welcome, {username} </h2>
                    <input type="text"
                        value={this.state.searchString}
                        onChange={this.searchStringhandler}
                        placeholder="Search Planets .." />
                    <br />
                    {list}
                    <br />
                    <button className="logoutbtn" onClick={this.logout}>Logout</button>
                </div>
            </div>
        )
    }
} 

export default SearchComponent;
