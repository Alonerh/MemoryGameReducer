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

	const [isPlaying, setIsPlaying] = useState(false)


	//useEffect(()=>resetAndCreateGrid(), []);

	useEffect(()=>{
		const timer = setInterval(()=>{
			if(gameState.playing) dispatch(IncreaseTimeElapsedAction());
		}, 1000);
		return ()=> clearInterval(timer);
	}, [gameState.playing, gameState.timeElapsed]);

	// verify if opened and equal
	useEffect(()=>{
		if(gameState.shownCount === 2) {
			let opened = gameState.gridItems.filter(item => item.shown === true);
			if(opened.length === 2) {
				if(opened[0].item === opened[1].item) {
					// v1 - if equals, to permanentShown;
					dispatch(CheckGameAction(true));
				} else {
					// v2 - Are not equal, so close them;
					setTimeout(()=>{
						let tmpGrid = [...gameState.gridItems];
						for(let i in tmpGrid) {
							tmpGrid[i].shown = false;	
						}	
						dispatch(CheckGameAction(false));
					}, 1000);
				}
			}
		}
	}, [gameState.shownCount, gameState.gridItems])

	useEffect(()=>{
		if(gameState.moveCount > 0 && gameState.gridItems.every(item => item.permanentShown === true)){
			dispatch(GameOverAction());
		}
	}, [gameState.moveCount, gameState.gridItems]);

	// Functions
	const resetAndCreateGrid = ()=>{
		// passo 1 - Resetar o jogo
		// passo 2 - Criar o grid

		// passo 2.1 - Criar o Grid vazio
		let tmpGrid: GridItemType[] = [];
		for(let i = 0; i < (items.length * 2); i++) {
			tmpGrid.push({
				item: null, permanentShown: false, shown: false
			});
		};
		// passo 2.2 - Preencher o 
		for(let w = 0; w < 2; w++) {
			for(let i = 0; i < items.length; i++){
				let pos = -1;
				while(pos < 0 || tmpGrid[pos].item !== null) {
					pos = Math.floor(Math.random() * (items.length * 2));
				}
				tmpGrid[pos].item = i;
			}
		}
		dispatch(StartGameAction(tmpGrid));

		// passo 2.3 - Jogar o state

		// passo 3 - Começar o jogo
	};
	
	/* const handleItemClick = (index:number) => {
		if(playing && index !== null && shownCount < 2) {
			let tmpGrid = [...gridItems];
			if(tmpGrid[index].permanentShown === false && tmpGrid[index].shown === false) {
				tmpGrid[index].shown = true;
				setShownCount(shownCount + 1);
			}
			setGridItems(tmpGrid);
		};
	} */
	const handleItemClick = (index:number) => {
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