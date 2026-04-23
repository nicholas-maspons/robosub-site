import { useEffect, useState } from 'react';
import styles from './AuvAnatomyPage.module.css';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          src?: string;
          alt?: string;
          'shadow-intensity'?: string;
          'camera-controls'?: boolean;
          'auto-rotate'?: boolean;
          ar?: boolean;
          'ar-modes'?: string;
          'ar-scale'?: string;
          exposure?: string;
          'environment-image'?: string;
        },
        HTMLElement
      >;
    }
  }
}

const partsData = [
  {
    id: 'propeller',
    name: 'Frame',
    // PLACEHOLDER: data-position values need real coordinates from hotspot-editor.html
    position: '-0.2 -0.1 0',
    description: 'The main structural frame of the AUV, providing the foundation and mounting points for all other components. Built from lightweight yet durable materials to withstand underwater pressure.',
  },
  {
    id: 'frame',
    name: 'Pressure Vessel',
    position: '0 0.1 -0.2',
    description: 'Waterproof housing that protects sensitive electronics from water damage. Maintains atmospheric pressure inside while withstanding external water pressure at depth.',
  },
  {
    id: 'motors',
    name: 'CPU',
    position: '0 0 -0.2',
    description: 'Central processing unit that controls all AUV operations, navigation, and sensor data processing. Runs the autonomous control algorithms and mission planning software.',
  },
  {
    id: 'sensors',
    name: 'Thrusters',
    position: '0.2 0 -0.1',
    description: 'Propulsion system consisting of multiple thrusters that provide movement in all directions. Allows precise maneuvering and station-keeping underwater.',
  },
  {
    id: 'battery',
    name: 'Camera',
    position: '0 0 -0.1',
    description: 'High-resolution underwater camera system for visual navigation, object detection, and mission documentation. Provides real time video feedback to operators.',
  },
  {
    id: 'hotspot7',
    name: 'Batteries',
    position: '0 -0.1 -0.2',
    description: 'High-capacity lithium-ion battery pack that powers all AUV systems. Designed for extended mission duration with hot-swappable capability for continuous operations.',
  },
];

type Part = typeof partsData[0] | null;

function AuvAnatomyPage() {
  const [activeCard, setActiveCard] = useState<Part>(null);

  useEffect(() => {
    if (document.querySelector('script[data-mv]')) return;
    const script = document.createElement('script');
    script.type = 'module';
    script.src = 'https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js';
    script.setAttribute('data-mv', 'true');
    document.head.appendChild(script);
  }, []);

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <h1 className={styles.title}>Interactive AUV Anatomy Explorer</h1>
        <p className={styles.sub}>
          Explore the internal and external anatomy of our AUV, Kelpie, by clicking on the interactive hotspots below!
        </p>

        <div className={styles.modelWindow}>
          {/* @ts-ignore */}
          <model-viewer
            src="/models/newkelpie.glb"
            alt="3D model of AUV Kelpie"
            shadow-intensity="1"
            camera-controls
            auto-rotate
            ar
            ar-modes="webxr scene-viewer quick-look"
            ar-scale="fixed"
            exposure="1.5"
            environment-image="neutral"
            style={{ width: '100%', height: '100%', display: 'block' } as React.CSSProperties}
          >
            {partsData.map((part, i) => (
              <button
                key={part.id}
                slot={`hotspot-${part.id}`}
                className={styles.hotspot}
                data-position={part.position}
                data-normal="0 1 0"
                onClick={() => setActiveCard(part)}
              >
                {i + 1}
              </button>
            ))}

            {/* AR button not working rn please hold */}
            <button slot="ar-button" className={styles.arButton}>
              🥽 View in AR
            </button>
          {/* @ts-ignore */}
          </model-viewer>

          {activeCard && (
            <div className={styles.infoCard}>
              <h2>{activeCard.name}</h2>
              <p>{activeCard.description}</p>
              <button className={styles.closeBtn} onClick={() => setActiveCard(null)}>Close</button>
            </div>
          )}
        </div>

        <p className={styles.controls}>
          <strong>Controls:</strong> Drag to rotate • Scroll to zoom • Double-click to reset view
        </p>

        <div className={styles.arBanner}>
          🚀 Ready to dive deeper? Bring Kelpie into your world with Augmented Reality!
          <div className={styles.arSub}>
            🥽 On Meta Quest: tap "View in AR" above • 📱 On mobile: tap the AR button in the model viewer
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuvAnatomyPage;