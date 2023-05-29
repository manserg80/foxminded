import './counterStyle.css';

import React from 'react';

class AppClass extends React.Component {
    constructor(props){
        super(props);
        this.state= { 
            count: 0
        }
    }
    render() {
        return(
            <div className="App">
                <h1 className= {this.state.count > 0 ? "positive" : this.state.count < 0 ? "negative" : null}>{ this.state.count }</h1> 
                <div className="button-wrapper">
                    <button 
                        onClick={() => {
                            this.setState((prev) => ({
                                count: prev.count - 1,
                            }));
                        }}
                    >
                    -
                    </button>

                    <button
                        onClick={() => {
                            this.setState((prev) => ({
                                count: prev.count + 1,
                            }));
                        }}
                    >
                    +
                    </button>
                </div>

                <div className="seperator"></div>

                <h2>Application State</h2>
                    <p>Count: { this.state.count }</p>
                <div className="button-wrapper">
                    <button
                        className="text"
                            onClick={() => {
                                this.setState({ count: 0 });
                            }}>
                    Clear State
                    </button>
                </div>
            </div>)
        
    }
}
export default AppClass;
