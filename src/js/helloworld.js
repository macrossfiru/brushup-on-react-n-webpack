import React from "react";
import hello from './components/hello';
import world from './components/world';

class HelloWorld extends Component {
    render() {
        return(
            <div className="HelloWorld">
                <p>Proposal - Greeting</p>
                <hello/>
                <world/>
            </div>
        );
    }
}

export default HelloWorld;
