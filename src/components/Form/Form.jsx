import React, { Component } from 'react'
import {connect} from 'react-redux'
import Axios from 'axios';

class Form extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            imgURL: '',
            content: ''
        }
    }

    handleChange(prop, evt) {
        this.setState({
            [prop]: evt.target.value
        })
    }

    async addNew() {
        const {id} = this.props
        const {title, imgURL, content} = this.state
        await Axios.post(`/api/post/${id}`, {title, imgURL, content})
        this.props.history.push('/dashboard')
    }

    render() {
        return (
            <div>
                <p>
                    Title: 
                    <input
                        type="text"
                        onChange={(e) => this.handleChange('title', e)}
                        value={this.state.title}
                    />
                </p>
                <p>
                    Content: 
                    <input
                        type="text"
                        onChange={(e) => this.handleChange('content', e)}
                        value={this.state.content}
                    />
                </p>
                <p>
                    Image URL: 
                    <input
                        type="text"
                        onChange={(e) => this.handleChange('imgURL', e)}
                        value={this.state.imgURL}
                    />
                </p>
                <p>
                    Preview: 
                    <img src={this.state.imgURL} alt=""/>
                </p>
                <button onClick={() => this.addNew()}>Post</button>
            </div>
        )
    }
}

function mapStateToProps(store) {
    return {
        id: store.id
    }
}

export default connect(mapStateToProps)(Form)