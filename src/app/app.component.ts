import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  inputText = '';
  transformedText = '';
  capitalizeFirst = false;
  ignoreNonLetters = true;
  showAlert = false;
  flagClass = false;
  transformText(): void {
    let text = this.inputText.trim();

    if (this.ignoreNonLetters) {
      text = text.replace(/[^a-zA-Z ]/g, '');
    }

    const words = text.split(/\s+/);

    const transformedWords = words.map((word, index) => {
      if ((index === 0 && this.capitalizeFirst) || index >= 1) {
        return this.capitalizeFirstLetter(word);
      } else {
        return word.toLowerCase();
      }
    });

    this.transformedText = transformedWords.join('');
  }

  private capitalizeFirstLetter(word: string): string {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  clear() {
    this.transformedText = '';
    this.inputText = '';
  }

  copyToClipboard(): void {
    navigator.clipboard
      .writeText(this.transformedText)
      .then(() => {
        this.showAlert = true;
        setTimeout(() => {
          this.flagClass = true;
          setTimeout(() => {
            this.showAlert = false;
            this.flagClass = false;
          }, 300);
        }, 2000);
      })
      .catch((err) => {
        console.error('Error al intentar copiar al portapapeles: ', err);
      });
  }
}
