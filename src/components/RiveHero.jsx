import {useState, useEffect, useRef} from 'react';
import Rive from '@rive-app/react-canvas';
import { useRive, useStateMachineInput } from '@rive-app/react-canvas';

//import riveFile from '../rive/eclipse_demo_3.riv';

const RiveHero = () => {
  const [scrolledOver, setScrolledOver] = useState(false);
  const textElement = useRef(null);

  useEffect(() => {
    const handleScroll = event => {
      if (window.scrollY > 500) {
        setScrolledOver(true)
      } else {
        setScrolledOver(false)
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const { rive, RiveComponent } = useRive({
    src: '/hero_apricity.riv',
    stateMachines: "eclipseStateMachine",
    autoplay: true,
  });

  const numberInput = useStateMachineInput(rive, "eclipseStateMachine", "scroll", 0);

  useEffect(() => {

    if (scrolledOver) {
      /* Scrolleamos + de 500px */
      if (numberInput && rive && textElement) {
        numberInput.value = 3;
        textElement.current.classList.remove('no-show');
      }
    } else {
      /* Scrolleamos por sobre los 500px */
      if (numberInput && rive && textElement) {
        numberInput.value = 0;
        textElement.current.classList.add('no-show');
      }
    }
  }, [scrolledOver])

  return (
    <div className="hero-container">
        <div
            className="rive-hero-container"
        >
      <RiveComponent
        className="rive-hero-canvas"
      />
			<div className="long-definition-section content-container no-show" ref={textElement}>
				<div className="long-definition">
					<p className="long-definition-text">
						Apricity describes the feeling of warmth
						imparted by the sun in wintertime.
						<br /><br />
						It is a sensation of emotional contrast, of
						hope through an emergence of light, in defiance
						of the overbearing cold and dark.
						<br /><br />
						Our commitment is to orchestrate solutions to
						the most consequential challenges of our time.
						<br /><br />
						<italic>
							Our company stands for the potentiation of humanity and
							the actualization of a brighter world.
						</italic>
					</p>
				</div>
			</div>
        </div>
    </div>
  );
}

export default RiveHero;