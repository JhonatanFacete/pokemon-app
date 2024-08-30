import React, {useState} from "react";
import PokeTarjeta from "./PokeTarjeta";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from 'react-router-dom';


test('Muestra Pokemon con el nombre correcto', async () => {
    const pokemon = { url: 'https://pokeapi.co/api/v2/pokemon/1/' };
    render(
        <BrowserRouter>
            <PokeTarjeta poke={pokemon} />
        </BrowserRouter>
    );
  
    
    const linkElement = await screen.findByText(/bulbasaur/i);
    expect(linkElement).toBeInTheDocument();
  });