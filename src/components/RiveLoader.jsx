import React from "react";
import { useState, useEffect } from "react";
import { useRive, useRiveStateMachineInput, useStateMachineInput } from "@rive-app/react-canvas";


const RiveLoader = () => {
    /* Inputs in React State */
    

    /* Rive Hooks */
    /* useRive */
    
    

    /* useStateMachineInput */
    

    /* Effects para setear valores de Inputs Rive */
    

    return(
        <div>
            <h1>Rive Loader example</h1>
            
            <div className="rive-container">
                {/* RiveComponent */}
            </div>
            
            {/* UI para interactuar con los inputs que espera Rive */}
            <div className="card">
                <button onClick={() => useStart(!start)}>
                    {!start ? 'Start' : 'Stop'}
                </button>
                <label forHtml="loading">Loading: </label>
                <input
                    type="number"
                    name="loading"
                    defaultValue={0}
                    onChange={(e) => {useLoading(e.target.value)}}
                    disabled={!start}
                />
            </div>
        </div>
    )
}

export default RiveLoader;