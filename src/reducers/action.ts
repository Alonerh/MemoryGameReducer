import { GridItemType} from "../types/GridItemType";

export enum ActionTypes {
	START_GAME = "START_GAME",
	CHECK_PLAY = 'CHECK_PLAY',
	GAME_OVER = 'GAME_OVER',
	INCREASE_SHOWN_COUNT = 'INCREASE_SHOWN_COUNT',
	INCREASE_TIME_ELAPSED = 'INCREASE_TIME_ELAPSED',
	SET_GRID_ITEMS = 'SET_GRID_ITEMS'
}

interface StartGameActionProps {
	type: ActionTypes.START_GAME,
	payload: {
		tempGrid: GridItemType[]
	}
};

interface CheckGameActionProps {
	type: ActionTypes.CHECK_PLAY,
	payload: {
		isEquals: boolean
	}
};
interface GameOverActionProps {
	type: ActionTypes.GAME_OVER
};
interface IncreaseShownCountActionProps {
	type: ActionTypes.INCREASE_SHOWN_COUNT
};
interface IncreaseTimeElapsedActionProps {
	type: ActionTypes.INCREASE_TIME_ELAPSED
};
interface SetGridItemsActionProps {
	type: ActionTypes.SET_GRID_ITEMS,
	payload: {
		gridItems: GridItemType[]
	}
};


export type GameActions =
	| StartGameActionProps
	| CheckGameActionProps
	| GameOverActionProps
	| IncreaseShownCountActionProps
	| IncreaseTimeElapsedActionProps
	| SetGridItemsActionProps

export function StartGameAction(tempGrid: GridItemType[]): StartGameActionProps {
	return {
		type: ActionTypes.START_GAME,
		payload: {
			tempGrid
		}
	}
}

export function CheckGameAction(isEquals:boolean): CheckGameActionProps {
	return {
		type: ActionTypes.CHECK_PLAY,
		payload: {
			isEquals
		}
	}
}
      
export function GameOverAction(): GameOverActionProps{
	return {
		type: ActionTypes.GAME_OVER
	}
}
export function IncreaseShownCountAction(): IncreaseShownCountActionProps{
	return {
		type: ActionTypes.INCREASE_SHOWN_COUNT
	}
}
export function IncreaseTimeElapsedAction (): IncreaseTimeElapsedActionProps{
	return {
		type: ActionTypes.INCREASE_TIME_ELAPSED
	}
}
export function SetGridItemsAction(gridItems: GridItemType[]): SetGridItemsActionProps{
	return {
		type: ActionTypes.SET_GRID_ITEMS,
		payload: {
			gridItems 
		}
	}
}