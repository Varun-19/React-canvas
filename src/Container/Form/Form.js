import React, { Component } from 'react';
import swal from 'sweetalert';

import Input from '../../Components/Input/Input';
import ScoreBook from '../ScoreBook/ScoreBook';
import * as styles from './Form.module.css';
class Form extends Component {

    state = {
        scoresForm : {
            Quant : {
                type: 'number',
                min: '0',
                max: '60',
                valueCurrent : '',
                valueTarget: ''
            },
            Verbal : {
                type: 'number',
                min: '0',
                max: '60',
                valueCurrent : '',
                valueTarget: ''
            }
        }
    }

    formHandler = (event) => {
        event.preventDefault(this.state.scoresForm.Quant.valueCurrent);
        if (((this.state.scoresForm.Quant.valueCurrent) && (this.state.scoresForm.Quant.valueTarget) &&
            (this.state.scoresForm.Verbal.valueCurrent) && (this.state.scoresForm.Verbal.valueTarget))) {
            const scores = {
                    quantCurrentValue : this.state.scoresForm.Quant.valueCurrent,
                    quantTargetValue : this.state.scoresForm.Quant.valueTarget,
                    verbalCurrentValue : this.state.scoresForm.Verbal.valueCurrent,
                    verbalTargetValue : this.state.scoresForm.Verbal.valueTarget
            }
            this.setState({score : scores});
        } else {
            swal('Enter all values')
        }
        
        
        
    }

    currentChangeHandler = (event,id) => {
        let updatedForm = {
            ...this.state.scoresForm,  
        }
        let updatedFormElement = {
            ...this.state.scoresForm[id],
            valueCurrent: event.target.value
        }
        updatedForm[id] = updatedFormElement;
        this.setState({scoresForm :  updatedForm});
    }

    targetChangedHandler = (event,id) => {
        let updatedForm = {
            ...this.state.scoresForm,  
        }
        let updatedFormElement = {
            ...this.state.scoresForm[id],
            valueTarget: event.target.value
        }
        updatedForm[id] = updatedFormElement;
        this.setState({scoresForm :  updatedForm});
    }

    render() {
        let formObjectArray = [];
        for(let key in this.state.scoresForm) {
            formObjectArray.push({
                id : key,
                config : this.state.scoresForm[key]
            })
        }
        return(
            <React.Fragment>
                <form className={styles.form} onSubmit={this.formHandler}>
                    {formObjectArray.map(formElements =>              
                        <Input key = {formElements.id} 
                        elementType={formElements.config.type} 
                        elementLabel={formElements.id.toString()}
                        min={formElements.config.min}
                        max={formElements.config.max}
                        changedCurrent={(event) => {this.currentChangeHandler(event,formElements.id)}}
                        changedTarget={(event) => {this.targetChangedHandler(event,formElements.id)}}/>
                    )}
                    <button>Submit &amp; Refresh</button>
                </form>
                {this.state.score ? <ScoreBook quantCurrentValue={this.state.score.quantCurrentValue} 
                            quantTargetValue={this.state.score.quantTargetValue}
                            verbalCurrentValue={this.state.score.verbalCurrentValue}
                            verbalTargetValue={this.state.score.verbalTargetValue}/> : null} 
            </React.Fragment>
        )
    }
}

export default Form;