import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class App extends Component {
    reloadTestIframe() {
        const iframe = ReactDOM.findDOMNode(this.refs.jasmine);
        iframe.src = iframe.src;
    }

    sendMessage() {
        const iframe = window.frames.jasmine;
        const message = {
            tests: `
                it("shiuld", function() {
                    expect(window.test).toEqual(jasmine.any(Function));
                });
            `,
            code: ReactDOM.findDOMNode(this.refs.code).value
        };

        iframe.postMessage(JSON.stringify(message), '*');
    }

    render() {
        return (
            <div>
                <textarea id="code" ref="code"></textarea>
                <button onClick={this.reloadTestIframe.bind(this)}>Send</button>
                <iframe src="/src/iframe/jasmine.html" ref="jasmine" name="jasmine" id="jasmine" onLoad={this.sendMessage.bind(this)}></iframe>
            </div>
        );
    }
}