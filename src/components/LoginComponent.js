import React, {Component} from 'react';

import './common.css';

class LoginComponent extends Component{

    state = {
        credentials: {}
    }
    /* //API DATA for login for reference
    Beru Whitesun lars:	"47BBY"
    Biggs Darklighter:	"24BBY"
    C-3PO:				"112BBY"
    Darth Vader:		"41.9BBY"
    Leia Organa:		"19BBY"
    Luke Skywalker:		"19BBY"
    Obi-Wan Kenobi:		"57BBY"
    Owen Lars:			"52BBY"
    R2-D2:				"33BBY"
    R5-D4:				"unknown"
    */
    login = (e) => {
        e.preventDefault();
        let username = e.target.elements.username.value;
        let password = e.target.elements.password.value;
        let credentials = {...this.state.credentials};
        if ( credentials[username] === password)
            this.props.history.push('/search_page/'+username);
        else
            alert("Invalid Credentials");
    }

    componentDidMount(){
        let credentials;
        fetch('http://swapi.dev/api/people/')
        .then(response => response.json())
        .then(data => {
            credentials = data.results.reduce( (obj, element) => {
                obj[element.name] = element.birth_year;
                return obj;
                }, {});
            this.setState({credentials: credentials});
        });
    }

    render(){
        return(
            <div className="box">
                <form onSubmit={this.login}> 
                <div className="container">
                    <label><b>UserName</b></label>
                    <input type="text" name = "username" placeholder="Enter UserName"/>
                    <br/>
                    <label><b>Password</b></label>
                    <input type="password" name = "password" placeholder="Enter Password"/>
                    <br />
                    <button className="loginbtn" type="submit">Login</button>
                </div>
                </form>
            </div>
        )
    }
} 

export default LoginComponent;