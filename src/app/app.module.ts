import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CharactersComponent } from './characters/characters.component';
import { AppRoutingModule } from './app-routing.module';
import { CharacterService } from './services/character.service';
import { FormsModule } from '@angular/forms'; // Asegúrate de importar FormsModule

@NgModule({
  declarations: [AppComponent, HomeComponent, CharactersComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, // Añadir FormsModule
  ],
  providers: [CharacterService],
  bootstrap: [AppComponent],
})
export class AppModule {}
