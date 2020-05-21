import React, { useState, useEffect } from "react";
//Importamos el Hook useState desde React que nos permite mantener un estado local en un componente funcional

import ReactDOM from "react-dom";

import "bootstrap";

export function Counter(props) {
	const [seconds, setSeconds] = useState(0);
	const [isActive, setIsActive] = useState(false);

	const startButton = () => {
		isActive ? setIsActive(false) : setIsActive(true);
	};

	const pauseTime = () => {
		setIsActive(!isActive);
	};

	const resetButton = () => {
		setSeconds(0);
		setIsActive(false);
	};

	const onChangeHandler = event => {
		setSeconds(event.target.value);
	};

	useEffect(
		() => {
			let interval = null;
			if (isActive) {
				interval = setInterval(() => {
					setSeconds(seconds => seconds - 1);
				}, 1000);
			} else if (!isActive && seconds !== 0) {
				clearInterval(interval);
			}
			return () => clearInterval(interval);
		},
		[isActive, seconds]
	);

	//Esta sintaxis de Javascript se llama “desestructuración de arrays”. Significa que estamos creando dos variables contador y setContador, donde contador se obtiene del primer valor devuelto por useState y setContador es el segundo. Es equivalente a este código:
	//var CounterStateVariable = useState(0); // Returns a pair
	//var contador = CountertStateVariable[0]; // First item in a pair
	//var setContador = CounterStateVariable[1]; // Second item in a pair
	//const setContador = () => contador + 1;

	//useState nos devuelve un array de 2 posiciones.
	//La 1ª posicion es el valor de nuestro estado
	//La 2º posicion tendrá un metodo que al llamarlo podremos pasarle
	//como parametro el nuevo valor del estado
	//Devolver los elementos que queremos renderizar-> return
	// Dentro del componente funcional Counter declaramos una nueva variable de estado llamando al Hook useState. Este nos devuelve un par de valores, a los que damos un nombre. Llamamos contador a nuestra variable porque guarda el número de segundos. La inicializamos a cero pasando 0 como único argumento a useState. El segundo elemento retornado es una función que nos permite actualizar contador, por lo que le llamamos setContador

	return (
		<form className="needs-validation" noValidate>
			<div className="form-row justify-content-center">
				<div className="col-auto justify-content-center">
					<label className="title mt-2" htmlFor="validationCustom01">
						Introduce here your seconds to countdown
					</label>
					<input
						type="text"
						className="form-control mb-2"
						id="validationCustom01"
						placeholder="How many seconds?"
						required
						onChange={onChangeHandler}
						value={seconds}
					/>
					<button
						type="button"
						className="btn btn-primary mr-2"
						onClick={startButton}>
						{isActive ? "Pause" : "Start"}
					</button>
					<button
						type="button"
						className="btn btn-primary mr-2"
						onClick={resetButton}>
						Reset
					</button>
					<span>Your countdown {seconds}</span>
				</div>
			</div>
		</form>
	);
}
