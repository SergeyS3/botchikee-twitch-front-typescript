export interface IAuthData {
	user: IUser
	TwitchOAuth: {
		client_id: string
		redirect_uri: string
	}
}
export interface IUser {
	name: string
	pic: string
	permissionLvl: string
}

export type id = string

interface IItem {
	id?: id
	key: id | number
}

export interface ISettingsItem extends IItem {
	channels: string[]
}
export interface IModuleItem extends IItem {
	active: boolean
	name: string
	channels: string[]
}
export interface ISubmoduleItem extends IItem {
	active: boolean
	name: string
	modules: string[]
}
export interface IAnswerItem extends IItem {
	active: boolean
	type: string
	text: string
	answer: string
	channels: string[]
	users: string[]
}
export interface IModBanWordItem extends IItem {
	active: boolean
	text: string
	channels: string[]
}
export interface IModReplacementItem extends IItem {
	from: string
	to: string
}
export interface ICommandItem extends IItem {
	active: boolean
	text: string
	module: string
	users: string[]
}
export type AnyItem = ISettingsItem
	| IModuleItem
	| ISubmoduleItem
	| IAnswerItem
	| IModBanWordItem
	| IModReplacementItem
	| ICommandItem

export type ItemSaveAction<T> = (item: T) => Promise<void | id>

interface IItemComponentProps<T> {
	item: T
	save?: ItemSaveAction<T>
	onRemove?: Function
}

export type SetItemVal<T> = <K extends keyof T>(key: K, newVal: T[K]) => void