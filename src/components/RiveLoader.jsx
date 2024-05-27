import React from "react";
import { useState, useEffect } from "react";
import { useRive, useRiveStateMachineInput, useStateMachineInput } from "@rive-app/react-canvas";


const RiveLoader = () => {

    const [start, useStart] = useState(false);
    const [loading, useLoading] = useState(0);

    /* Rive Hooks */
    /* Rive Component */
    const { rive, RiveComponent } = useRive({
        src: "/haku_loader.riv",
        stateMachines: "State Machine 1",
        autoplay: true,
    })

    /* Rive inputs */
    const startInput = useStateMachineInput(
        rive,
        "State Machine 1",
        "Start",
        false
    );
    
    const loadingInput = useStateMachineInput(
        rive,
        "State Machine 1",
        "Loading",
        0
    );

    /* Effects para setear valores de Inputs Rive */
    useEffect(() => {
        if (rive && startInput) {
            startInput.value = start;
        }
    }, [start])

    useEffect(() => {
        if (rive && loadingInput) {
            loadingInput.value = loading;
        }
    }, [loading])

    return(
        <div>
            <h1>Rive Loader example</h1>
            
            <div className="rive-container">
                <RiveComponent className="rive-component" /> {/* Este componente renderiza rive en un <canvas> */}
            </div>
            
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