import { useParams } from 'react-router-dom';
import EditMarriageGarden from './EditMarriageGarden';
import EditPartyHall from './EditPartyHall';
import EditCommunityHall from './EditCommunityHall';
import EditBanquetHall from './EditBanquetHall';
import EditFarmHouse from './EditFarmHouse';
import EditEventManagement from './EditEventManagement';
import EditTent from './EditTent';
import EditStageSetup from './EditStageSetup';
import EditSoundSystem from './EditSoundSystem';
import EditLightingSetup from './EditLightingSetup';
import EditGenerator from './EditGenerator';
import EditCatering from './EditCatering';
import EditSweetShop from './EditSweetShop';
import EditIceCreamCounter from './EditIceCreamCounter';
import EditJuiceCounter from './EditJuiceCounter';
import EditLiveFoodStall from './EditLiveFoodStall';
import EditWeddingPlanner from './EditWeddingPlanner';
import EditMehndiArtist from './EditMehndiArtist';
import EditMakeupArtist from './EditMakeupArtist';
import EditCostumeDress from './EditCostumeDress';
import EditBouncyKidsGame from './EditBouncyKidsGame';
import EditCarRental from './EditCarRental';
import EditFlowerVendor from './EditFlowerVendor';
import EditBalloonDecorator from './EditBalloonDecorator';
import EditFurnitureRental from './EditFurnitureRental';
import EditDJ from './EditDJ';
import EditBandBaja from './EditBandBaja';
import EditDholTasha from './EditDholTasha';
import EditShehnai from './EditShehnai';
import EditPhotographer from './EditPhotographer';
import EditVideographer from './EditVideographer';

function EditListing() {
  const { type } = useParams();

  // Map URL type to the correct component
  const componentMap = {
    'marriage-garden': EditMarriageGarden,
    'party-hall': EditPartyHall,
    'community-hall': EditCommunityHall,
    'banquet-hall': EditBanquetHall,
    'farm-house': EditFarmHouse,
    'event-management': EditEventManagement,
    'tent': EditTent,
    'stage-setup': EditStageSetup,
    'sound-system': EditSoundSystem,
    'lighting-setup': EditLightingSetup,
    'generator': EditGenerator,
    'catering': EditCatering,
    'sweet-shop': EditSweetShop,
    'ice-cream-counter': EditIceCreamCounter,
    'juice-counter': EditJuiceCounter,
    'live-food-stall': EditLiveFoodStall,
    'wedding-planner': EditWeddingPlanner,
    'mehndi-artist': EditMehndiArtist,
    'makeup-artist': EditMakeupArtist,
    'costume-dress': EditCostumeDress,
    'bouncy-kids-game': EditBouncyKidsGame,
    'car-rental': EditCarRental,
    'flower-vendor': EditFlowerVendor,
    'balloon-decorator': EditBalloonDecorator,
    'furniture-rental': EditFurnitureRental,
    'dj': EditDJ,
    'band-baja': EditBandBaja,
    'dhol-tasha': EditDholTasha,
    'shehnai': EditShehnai,
    'photographer': EditPhotographer,
    'videographer': EditVideographer
  };

  const Component = componentMap[type];

  if (!Component) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Edit Page Not Found</h2>
          <p className="text-gray-600">The requested edit page for "{type}" is not available.</p>
        </div>
      </div>
    );
  }

  return <Component />;
}

export default EditListing;
