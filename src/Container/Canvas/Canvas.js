import React, { Component } from 'react';

import * as styles from './Canvas.module.css';

class Canvas extends Component {
    constructor() {
        super();
        this.state = { screenWidth: null };
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }
    
    updateWindowDimensions() {
        this.setState({ screenWidth: window.innerWidth });
     }

    componentDidMount() {     
        const canvas = this.refs.canvas;
        const width = this.refs.canvas.offsetWidth;
        const ctx = canvas.getContext("2d");
        this.drawGrids(ctx,width,50);
        this.drawScore(ctx,width);
        window.addEventListener("resize", this.updateWindowDimensions());
    }

    componentDidUpdate(prevProps, prevState) {
        const canvas = this.refs.canvas;
        const width = this.refs.canvas.offsetWidth;
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.drawGrids(ctx,width,50);
        this.drawScore(ctx,width);
        console.log(prevProps);
        if(prevProps !== this.props) {
            window.addEventListener("resize", this.updateWindowDimensions());
        }
        
    }

    drawGrids = (ctx,width,height) => {

        let xGrid = 10;
        let yGrid = 10;
        ctx.beginPath();

        while(xGrid < height) {
            ctx.moveTo(0,xGrid);
            ctx.lineTo(width,xGrid);
            xGrid += 10;
        }
        
        while(yGrid < width) {
            ctx.moveTo(yGrid,0);
            ctx.lineTo(yGrid,height);
            yGrid += 10;
        }
        
        //ctx.stroke();
    }


    drawScore = (ctx,width) => {
        
        let level = width * 1/10;
        let base = width - level;
        ctx.fillStyle = '#f5f5f5';
        ctx.moveTo(0,this.block(2.5));
        ctx.lineTo(base,this.block(2.5));
        ctx.quadraticCurveTo(base+10,this.block(3),base,this.block(3.5))
        ctx.lineTo(base,this.block(3.5));
        ctx.lineTo(0,this.block(3.5));
        ctx.fill();

        if(this.props.type === 'total'){
            this.drawTotalScore(ctx,base);
        } else {
            this.drawCurrentScore(ctx,base);
        }

    }
    
    drawCurrentScore = (ctx,base) => {
        let ratio = base/60;
        let totalScore = this.props.currentScore * ratio;
        let targetScore = this.props.targetScore * ratio; 
        let cs = this.props.currentScore;       
        let ts = this.props.targetScore;
        let difference = ts - cs ;
        let inverted = false;
        let position;
        if(difference < 3 && difference > -3) {
            inverted = true;
        }

        if(difference > 0 && difference < 3) {
            position = targetScore + 7.5;
        }

        if(difference >= 3){
            position = totalScore + (targetScore - totalScore)/2 - 3.5
        }

        let displayCS = this.props.prefix+cs;
        let displayTS = this.props.prefix+ts;
        this.drawTargetScore(ctx,displayTS,targetScore,'#ffe28a',inverted,position,difference);            
        this.drawTargetScore(ctx,displayCS,totalScore,'#0fa2eb',false,false,false);

    }

    drawTotalScore = (ctx,base) => {
        let ratio = base/800;
        let quantCurrent = this.props.quantCurrentValue;
        let quantTarget = this.props.quantTargetValue;
        let verbalCurrent = this.props.verbalCurrentValue;
        let verbalTarget = this.props.verbalTargetValue;
        let totalScore = 200 + ((parseInt(quantCurrent) + parseInt(verbalCurrent)) * 5) * ratio;
        let targetScore = 200 + ((parseInt(quantTarget) + parseInt(verbalTarget))* 5) * ratio; 
        let cs = 200 + ((parseInt(quantCurrent) + parseInt(verbalCurrent)) * 5);       
        let ts = 200 + ((parseInt(quantTarget) + parseInt(verbalTarget)) * 5);
        let difference = ts - cs;
        let inverted = false;

        let position;

        if(difference < 20 && difference > -20 ) {
            inverted = true;    
        }
        
        if(difference >= 30) {
            position = totalScore + (targetScore - totalScore)/2 -  7.5; 
        }
        
        if(difference < 30 && difference > 0) {
            position = targetScore + 7.5;
        } 

        this.drawTargetScore(ctx,ts,targetScore,'#ffe28a',inverted,position,difference);            
        this.drawTargetScore(ctx,cs,totalScore,'#0fa2eb',false,false,false);

    }
    
    drawTargetScore = (ctx,ts,score,style,inverted,position,difference) => {
        ctx.beginPath();
        ctx.fillStyle = style;
        ctx.moveTo(0,this.block(2.5));
        ctx.lineTo(score,this.block(2.5));
        ctx.quadraticCurveTo(score+10,this.block(3),score,this.block(3.5));
        ctx.lineTo(score,this.block(3.5));
        ctx.lineTo(0,this.block(3.5));
        if(inverted) {
            this.drawArrowInverted(ctx,score);
            ctx.fill(); 
            this.drawTextInverted(ctx,ts,score);
        } else {
            this.drawArrow(ctx,score);
            ctx.fill();
            this.drawText(ctx,ts,score);
        }
        
        if(position && difference) {
            ctx.fillText('+'+difference , position , this.block(3.3));
        }
        
        
           
             
    }

    drawArrow = (ctx,score)  => {
        ctx.moveTo(score+3.5,this.block(2.2));
        ctx.lineTo(score,this.block(1.2));
        ctx.lineTo(score+7,this.block(1.2));
    }

    drawArrowInverted = (ctx,score)  => {
        ctx.moveTo(score+3.5,this.block(3.7));
        ctx.lineTo(score,this.block(4.7));
        ctx.lineTo(score+7,this.block(4.7));
    }

    drawText = (ctx,ts,score) => {
        ctx.font = '20px';
        ctx.fillStyle = 'black';
        ctx.fillText(ts, score-5, this.block(.8)); 
    }

    drawTextInverted = (ctx,ts,score) => {
        ctx.font = '20px';
        ctx.fillStyle = 'black';
        ctx.fillText(ts, score-5, this.block(5.8)); 
    }

    block = (count) => {
        return count*10;
    }

    

    render(){

        let canvas = null;

        
        switch (this.props.type) {
            case 'total':
                canvas = <canvas ref='canvas' className={styles.canvasTotal}  width ='900px' height= '60px'></canvas>
                break;
            case 'mini' :
                canvas = <canvas ref='canvas' className={styles.Canvas}  width ='400px' height= '60px'></canvas>
                break;
            default:
                break;
        }

        return (
            <div>
                {canvas}
            </div>
        )
        
    }          
       
    
}

export default Canvas;