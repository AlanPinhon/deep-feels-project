export const campos = {
	name: /^[a-zA-ZÀ-ÿ\s]{3,40}$/, //Letras, espacios y acentos.
	password: /^.{7,20}$/, //Password 7 a 20 dígitos.
	email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
};