import { useEffect, useState } from 'react';
import * as C from './AppStyles';
import logoImage from './components/assets/devmemory_logo.png';
import RestartIcon from './components/svgs/restart.svg';
import EstrelaIcon from './components/svgs/estrela.svg';
import { Button } from './components/Button';
import { InfoItem } from './components/InfoItem';
import { GridItem } from './components/GridItem';
import { GridItemType } from './types/GridItemType';
import { items } from './components/data/items';
import { formatTimeElapsed } from './helpers/formatTimeElapsed';
import { useReducer } from "react";
import { gameReducer } from './reducers/reducer';
import {
	CheckGameAction,
	GameOverAction,
	IncreaseShownCountAction,
	IncreaseTimeElapsedAction,
	SetGridItemsAction,
	StartGameAction
} from "./reducers/action";

const App = ()=>{
	// Reacts
	const initialState = {	
		playing: false,
		timeElapsed: 0,
		moveCount: 0,
		shownCount: 0,
		gridItems: []
	};
	const [gameState, dispatch] = useReducer(gameReducer, initialState);

	//useEffect(()=>resetAndCreateGrid(), []);

	// Tempo do jogo

	useEffect(()=>{
		const timer = setInterval(()=>{
			if(gameState.playing) dispatch(IncreaseTimeElapsedAction());
		}, 1000);
		return ()=> clearInterval(timer);
	}, [gameState.playing, gameState.timeElapsed]);

	// verify if opened and equal
	useEffect(() => {
		if (gameState.shownCount === 2) {
		  const openGrids = gameState.gridItems.filter(item => item.shown)
		  // Verificação 1 - Se eles são iguais, manter eles abertos permanentemente
		  if (openGrids[0].item === openGrids[1].item) {
			dispatch(CheckGameAction(true))
		  } else {
			setTimeout(() => {
			  dispatch(CheckGameAction(false))
			}, 1000)
		  }
		}
	  }, [gameState.shownCount, gameState.gridItems])

	// End game
	useEffect(() => {
		if (gameState.playing) {
		  if (gameState.gridItems.every((item: any) => item.permanentShown === true)) {
			dispatch(GameOverAction())
			// setIsPlaying(false)
		  }
		}
	  }, [gameState.gridItems])

	// Functions


	function resetAndCreateGrid() {
		// setTimeElapsed(0)
		// setMoveCount(0)
		// setShownCount(0)
	
		// passo 1 - criar o grid
		// 1.1 - criar o grid vazio
		let tempGrid: GridItemType[] = []
	
		for (let i = 0; i < (items.length * 2); i++) {
		  tempGrid.push({
			item: null,
			shown: false,
			permanentShown: false
		  })
		}
	
		// 1.2 - preencher o grid temporário
		for (let i = 0; i < 2; i++) {
		  for (let j = 0; j < items.length; j++) {
			let pos = -1
	
			while (pos < 0 || tempGrid[pos].item !== null) {
			  pos = Math.floor(Math.random() * (items.length * 2))
			}
	
			tempGrid[pos].item = j
		  }
		}
	
		// passo 2 - resetar o jogo
		dispatch(StartGameAction(tempGrid))
	  }

	function handleItemClick(index: number) {
		if (gameState.playing && index != null && gameState.shownCount < 2) {
		  if (!gameState.gridItems[index].shown) {
			let newGrid = [...gameState.gridItems]
	
			if (!newGrid[index].permanentShown || !newGrid[index].shown) {
			  newGrid[index].shown = true
			  dispatch(IncreaseShownCountAction())
			  // setShownCount(prevState => prevState + 1)
			}
	
			dispatch(SetGridItemsAction(newGrid))
			// setGridItems(newGrid)
		  }
		}
	  }

	// Return 
	return (
		<div className="m-3">
			<C.Container>
				<C.Info>

					<C.LogoLink href="">
						<img src={logoImage} width="200" alt="" />
					</C.LogoLink>

					<C.InfoArea>
						ShowCount: {gameState.shownCount}
						<InfoItem label='Tempo' value={formatTimeElapsed(gameState.timeElapsed)}/>
						<InfoItem label='Movimentos' value={gameState.moveCount.toString()}/>


					</C.InfoArea>

					{!gameState.playing &&
						<Button label='Começar' icon={EstrelaIcon} onClick={resetAndCreateGrid}/>
					}
					{/* {gameState.playing && 
						<Button label='Reiniciar' icon={RestartIcon} onClick={gameState.endGame}/>
					} */}

					{/* {end &&
						<span>Fim de jogo</span>
					} */}
				</C.Info>

				<C.GridArea>
					<C.Grid>
						{gameState.gridItems.map((item, index)=>(
							<GridItem 
								key={index}
								item={item}
								onClick={()=>handleItemClick(index)}
							/>
						))}
					</C.Grid>
				</C.GridArea>
			</C.Container>
		</div>
	);
}

export default App;