import React, {Component} from "react"
import "./Calculator.css"

import Button from '../Componentes/Button'
import Display from '../Componentes/Display'

const initialState ={
    displayValue: '0',
    clearDisplay: false,
    operation: null,
    values: [0,0],
    current: 0
}


export default class Calculator extends Component{

    state = { ...initialState }

    constructor(props){
        super(props);
        
        this.clearMemory = this.clearMemory.bind(this);
        this.addOperetion = this.addOperetion.bind(this);
        this.addDigit = this.addDigit.bind(this);
        this.state = { ...initialState};
    }

    clearMemory(){
        this.setState({ ...initialState })
    }

    addOperetion(operation){

        if(this.state.current === 0 ){
            
            this.setState({operation, current:1, clearDisplay:true});
            
        
        }else{
            
            const igual = operation === '=';
            
            const currentOperation = this.state.operation;

            const values = [...this.state.values];
            if(!igual)
                this.realizarOperacao(currentOperation, operation, values);
            else
                this.realizarOperacao(currentOperation,currentOperation, values);

            this.setState({
                displayValue: values[0],
                operation: igual ? null : operation,
                current: igual ? 0 :1,
                clearDisplay: !igual,
                values
            })
            
        }


    }

    realizarOperacao(currentOperation, operation, values){
        switch(currentOperation !== operation || operation){
            case '/':
                values[0] = values[0]/values[1];
               
                break;

            case '*':
                values[0] = values[0]*values[1];
                
                break;

            case '-':
                values[0] = values[0]-values[1];
                
                break;

            case '+':
                values[0] = values[0]+values[1];
                
                break;
            default:
                
                this.realizarOperacao(operation, operation, values);
                break;
        }
        values[1] = 0;
    }

    addDigit(n){
        
        if(n === '.' && this.state.displayValue.includes('.')){
            return
        }
        
        const clearDisplay = this.state.displayValue === '0' || this.state.clearDisplay;
        const currentValue = clearDisplay ? '' : this.state.displayValue;
        const displayValue = currentValue + n;
        this.setState({displayValue, clearDisplay: false});

        if(n !== '.'){
            const i = this.state.current;
            const newValue = parseFloat(displayValue);
            const values = [...this.state.values];
            values[i] = newValue;
            this.setState({values});
        }
        
    }

    render(){
        return (
            <div className="calculator">
                <Display value={this.state.displayValue}/>
                <Button triple name='AC' click={this.clearMemory}/>
                <Button operation name='/' click={this.addOperetion}/>
                <Button name='7' click={this.addDigit}></Button>
                <Button name='8' click={this.addDigit}/>
                <Button name='9' click={this.addDigit}/>
                <Button operation name='*' click={this.addOperetion}/>
                <Button name='4' click={this.addDigit}/>
                <Button name='5' click={this.addDigit}/>
                <Button name='6' click={this.addDigit}/>
                <Button operation name='-' click={this.addOperetion}/>
                <Button name='1' click={this.addDigit}/>
                <Button name='2' click={this.addDigit}/>
                <Button name='3' click={this.addDigit}/>
                <Button operation name='+' click={this.addOperetion}/>
                <Button double name='0' click={this.addDigit}/>
                <Button name='.' click={this.addDigit}/>
                <Button operation name='=' click={this.addOperetion}/>


            </div>
        )
    }
}