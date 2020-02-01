import React from 'react';

import Canvas from '../Canvas/Canvas';
import * as styles from './ScoreBook.module.css';

class ScoreBook extends React.Component {
    state = {
        all : {
            quant : {
                current : this.props.quantCurrentValue,
                target : this.props.quantTargetValue,
                diff : this.props.quantTargetValue - this.props.quantCurrentValue,
                prefix : 'Q',
                type : 'quant'
            },
    
            verbal :{
                current : this.props.verbalCurrentValue,
                target : this.props.verbalTargetValue,
                diff : this.props.verbalTargetValue - this.props.verbalCurrentValue,
                prefix : 'V',
                type : 'verbal' 
            },
    
            total : {
                current : (200 + ((parseInt(this.props.quantCurrentValue) + parseInt(this.props.verbalCurrentValue)) * 5)),
                target : (200 + ((parseInt(this.props.quantTargetValue) + parseInt(this.props.verbalTargetValue)) * 5)), 
                diff : (200 + ((parseInt(this.props.quantTargetValue) + parseInt(this.props.verbalTargetValue)) * 5)) -
                        (200 + ((parseInt(this.props.quantCurrentValue) + parseInt(this.props.verbalCurrentValue)) * 5)),
                type : 'total',
                prefix : '',
            }
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps !== this.props) {
            const updatedState = {
                ...this.state,
                quant : {
                    ...this.state.quant,
                    current : this.props.quantCurrentValue,
                    target : this.props.quantTargetValue,
                    diff : this.props.quantTargetValue - this.props.quantCurrentValue,
                    prefix : 'Q',
                    type : 'quant'
                },
        
                verbal :{
                    ...this.state.verbal,
                    current : this.props.verbalCurrentValue,
                    target : this.props.verbalTargetValue,
                    diff : this.props.verbalTargetValue - this.props.verbalCurrentValue,
                    prefix : 'V',
                    type : 'verbal' 
                },
        
                total : {
                    ...this.state.total,
                    current : (200 + ((parseInt(this.props.quantCurrentValue) + parseInt(this.props.verbalCurrentValue)) * 5)),
                    target : (200 + ((parseInt(this.props.quantTargetValue) + parseInt(this.props.verbalTargetValue)) * 5)), 
                    diff : (200 + ((parseInt(this.props.quantTargetValue) + parseInt(this.props.verbalTargetValue)) * 5)) -
                            (200 + ((parseInt(this.props.quantCurrentValue) + parseInt(this.props.verbalCurrentValue)) * 5)),
                    type : 'total',
                    prefix : '',
                }
            }
            
            this.setState({all: updatedState})  
    }
             
    }
        
    para = (element) => {

        switch (true) {
            case (element.diff < 0):
                
                return <p> {`Your estimated GMAT score per performance in this mock test is ${element.prefix + element.current},
                which is ${Math.abs(element.diff)} points greater than your target 
                ${element.type === 'quant' || element.type === 'verbal' ? element.type : ''} 
                score of ${element.prefix+element.target}`}</p>
                
            case (element.diff > 0):

                return <p> {`Your estimated GMAT score per performance in this mock test is ${element.prefix + element.current},
                which is <b>${Math.abs(element.diff)} points </b> lesser than your target 
                ${element.type === 'quant' || element.type === 'verbal' ? element.type : ''} 
                score of ${element.prefix+element.target}`}</p>
            
            case (element.diff === 0) :
                return <p> {`Your estimated GMAT score per performance in this mock test is ${element.prefix+element.current},
                which is ${element.diff} equal to your target 
                ${element.type === 'quant' || element.type === 'verbal' ? element.type + ' ' : ''}score`} </p>
            default:
                break;
        }
    }
    
    render() {        

        return(
            <section className={styles.scoreBook}>
                <h4>Total Score</h4>
                <h4>{200 + ((parseInt(this.props.quantCurrentValue) + parseInt(this.props.verbalCurrentValue)) * 5)}</h4>
                <Canvas quantCurrentValue={this.props.quantCurrentValue} 
                        quantTargetValue={this.props.quantTargetValue}
                        verbalCurrentValue={this.props.verbalCurrentValue}
                        verbalTargetValue={this.props.verbalTargetValue} type='total'/>
                {this.para(this.state.all.total)}
                <div className={styles.miniSheet}>
                    <div>
                        <h3>Quant Score</h3>
                        <h4>Q{this.props.quantCurrentValue}</h4>
                        <Canvas currentScore={this.props.quantCurrentValue} 
                                targetScore={this.props.quantTargetValue} type='mini'
                                prefix='Q'/>
                        {this.para(this.state.all.quant)}
                    </div>
                    <div>
                        <h3>Verbal Score</h3>
                        <h4>V{this.props.verbalCurrentValue}</h4>
                        <Canvas currentScore={this.props.verbalCurrentValue}
                                targetScore={this.props.verbalTargetValue} type='mini'
                                prefix='V'/>
                        {this.para(this.state.all.verbal)}
                    </div> 
                </div>
            </section>
        )
    }
}
export default ScoreBook;