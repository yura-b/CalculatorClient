import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import APILocalConfig, {CalculatorControllerUrl} from "./costants";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HttpClientModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'CalculatorClient';
  firstOperand!: number;
  secondOperand!: number;
  operator!: string;
  error: string | undefined;
  result: string | undefined;

  constructor(private http: HttpClient) {}

  calculate() {
    if(this.firstOperand != null && this.secondOperand != null && this.operator != null){
      const expression = `${this.firstOperand} ${this.operator} ${this.secondOperand}`
      this.http.post(`${APILocalConfig.URL}/${CalculatorControllerUrl}/calculate`, { expression }).subscribe((response: any) => {
        this.result = response.result.toFixed(3);
        this.error = undefined;
      }, error => {
        this.error = error.message
      });
    }
    else{
      this.error = "Enter all operands and operator"
    }

  }
}
