import { MapExplorer } from '@/components/map/MapExplorer';
import { mapPoints } from '@/lib/data';

export default function MapPage() {
  return <MapExplorer points={mapPoints} />;
}
