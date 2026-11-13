const audio = (file) => "assets/audio/" + file;
const art = (file) => "assets/art/art_" + file + ".webp";

export const sounds = [
  {id:"rain",name:"Soft rain",category:"Weather",file:"rain.m4a",art:"rain"},
  {id:"roof_rain",name:"Roof rain",category:"Weather",file:"roof_rain.m4a",art:"roof_rain"},
  {id:"heavy_rain",name:"Heavy rain",category:"Weather",file:"heavy_rain.m4a",art:"heavy_rain"},
  {id:"thunder",name:"Distant thunder",category:"Weather",file:"thunder.m4a",art:"thunder"},
  {id:"snow_wind",name:"Snow wind",category:"Weather",file:"snow_wind.m4a",art:"snow_wind"},
  {id:"wind",name:"Gentle wind",category:"Weather",file:"wind.m4a",art:"wind"},
  {id:"ocean",name:"Ocean",category:"Water",file:"ocean.ogg",art:"ocean"},
  {id:"shoreline",name:"Shoreline",category:"Water",file:"shoreline.m4a",art:"shoreline"},
  {id:"stream",name:"Stream",category:"Water",file:"stream.m4a",art:"forest_stream"},
  {id:"river",name:"River",category:"Water",file:"river.m4a",art:"river"},
  {id:"waterfall",name:"Waterfall",category:"Water",file:"waterfall.m4a",art:"waterfall"},
  {id:"pond",name:"Pond",category:"Water",file:"pond.m4a",art:"night_pond"},
  {id:"gutter",name:"Rain gutter",category:"Water",file:"gutter.m4a",art:"gutter"},
  {id:"night_forest",name:"Night forest",category:"Nature",file:"night_forest.m4a",art:"night_forest"},
  {id:"morning_forest",name:"Morning forest",category:"Nature",file:"morning_forest.m4a",art:"morning_forest"},
  {id:"woodland_birds",name:"Woodland birds",category:"Nature",file:"woodland_birds.m4a",art:"woodland_birds"},
  {id:"frogs",name:"Frogs",category:"Nature",file:"frogs.m4a",art:"frogs"},
  {id:"crickets",name:"Crickets",category:"Nature",file:"crickets.m4a",art:"crickets"},
  {id:"fire",name:"Campfire",category:"Nature",file:"fire.m4a",art:"campfire"},
  {id:"meadow",name:"Meadow",category:"Nature",file:"meadow.m4a",art:"meadow"},
  {id:"mountain_breeze",name:"Mountain breeze",category:"Nature",file:"mountain_breeze.m4a",art:"mountain_breeze"},
  {id:"medium_bowl",name:"Medium bronze bowl",category:"Meditation",file:"medium_bowl.m4a",art:"bronze_bowl"},
  {id:"monochord",name:"Monochord",category:"Meditation",file:"monochord.m4a",art:"monochord"},
  {id:"tanpura",name:"Tanpura",category:"Meditation",file:"tanpura.m4a",art:"tanpura"},
  {id:"gong",name:"Gong",category:"Meditation",file:"gong.m4a",art:"gong"},
  {id:"tingsha",name:"Tingsha",category:"Meditation",file:"tingsha.m4a",art:"tingsha"},
  {id:"chimes",name:"Chimes",category:"Meditation",file:"chimes.m4a",art:"koshi_chimes"},
  {id:"handpan",name:"Handpan",category:"Instruments",file:"handpan.m4a",art:"handpan"},
  {id:"kalimba",name:"Kalimba",category:"Instruments",file:"kalimba.m4a",art:"kalimba"},
  {id:"harmonium",name:"Harmonium",category:"Instruments",file:"harmonium.m4a",art:"harmonium"},
  {id:"wind_chimes",name:"Wind chimes",category:"Instruments",file:"wind_chimes.m4a",art:"wind_chimes"},
  {id:"warm_mask",name:"Warm mask",category:"Noise",file:"snow_wind.m4a",art:"snow_wind"},
  {id:"rain_mask",name:"Rain mask",category:"Noise",file:"heavy_rain.m4a",art:"heavy_rain"},
  {id:"ocean_mask",name:"Ocean mask",category:"Noise",file:"ocean.ogg",art:"ocean"},
  {id:"birds",name:"Morning birds",category:"Nature",file:"birds.m4a",art:"birds"},
  {id:"owl",name:"Night owl",category:"Nature",file:"owl.m4a",art:"owl"},
  {id:"cicadas",name:"Cicadas",category:"Nature",file:"cicadas.m4a",art:"cicadas"},
  {id:"jungle",name:"Tropical jungle",category:"Nature",file:"jungle.m4a",art:"jungle"},
  {id:"bowl",name:"Singing bowl",category:"Meditation",file:"bowl.m4a",art:"singing_bowls"},
  {id:"crystal",name:"Crystal singing bowl",category:"Meditation",file:"bowl_rub.m4a",art:"crystal_bowl"},
  {id:"bell",name:"Temple bell",category:"Meditation",file:"bell.m4a",art:"temple_bell"},
  {id:"tuning_fork",name:"Acoustic 440 Hz fork",category:"Meditation",file:"fork_440.m4a",art:"tuning_fork"},
  {id:"rim_bowl",name:"Rim-sung bowl",category:"Meditation",file:"rin.m4a",art:"rim_bowl"},
  {id:"bowl_ritual",name:"Tibetan bowl ritual",category:"Meditation",file:"tibetan_strike.m4a",art:"tibetan_ritual"},
  {id:"high_bowl",name:"High bronze bowl",category:"Meditation",file:"high_bowl.m4a",art:"high_bowl"},
  {id:"high_crystal",name:"High crystal bowl",category:"Meditation",file:"high_crystal.m4a",art:"high_crystal"},
  {id:"japanese_rin",name:"Japanese rin",category:"Meditation",file:"japanese_rin.m4a",art:"japanese_rin"},
  {id:"gentle_gong",name:"Gentle gong",category:"Meditation",file:"gentle_gong.m4a",art:"gentle_gong"},
  {id:"bamboo_chimes",name:"Bamboo chimes",category:"Meditation",file:"bamboo_chimes.m4a",art:"bamboo_chimes"},
  {id:"rainstick",name:"Rainstick",category:"Meditation",file:"rainstick.m4a",art:"rainstick"},
  {id:"fork_256",name:"256 Hz tuning fork",category:"Meditation",file:"fork_256.m4a",art:"fork_256"},
  {id:"fork_128",name:"128 Hz tuning fork",category:"Meditation",file:"fork_128.m4a",art:"fork_128"},
  {id:"brown",name:"Brown noise",category:"Noise",type:"brown",art:"brown_noise"},
  {id:"pink",name:"Pink noise",category:"Noise",type:"pink",art:"pink_noise"},
  {id:"white",name:"White noise",category:"Noise",type:"white",art:"white_noise"},
  {id:"blue",name:"Blue noise",category:"Noise",type:"blue",art:"blue_noise"},
  {id:"violet",name:"Violet noise",category:"Noise",type:"violet",art:"violet_noise"},
  {id:"grey",name:"Grey noise",category:"Noise",type:"grey",art:"grey_noise"},
  {id:"fan",name:"Soft fan",category:"Noise",type:"fan",art:"desk_fan"},
  {id:"box_fan",name:"Box fan",category:"Noise",type:"boxfan",art:"box_fan"},
  {id:"ceiling_fan",name:"Ceiling fan",category:"Noise",type:"fan",art:"ceiling_fan"},
  {id:"air_purifier",name:"Air purifier",category:"Noise",type:"purifier",art:"air_purifier"},
  {id:"ac_vent",name:"AC vent",category:"Noise",type:"vent",art:"ac_vent"},
  {id:"hvac",name:"HVAC",category:"Noise",type:"hvac",art:"hvac"},
  {id:"airplane",name:"Airplane cabin",category:"Noise",type:"airplane",art:"airplane"},
  {id:"train",name:"Train cabin",category:"Noise",type:"train",art:"train"},
  {id:"car",name:"Car cabin",category:"Noise",type:"car",art:"car"},
  {id:"highway",name:"Highway hum",category:"Noise",type:"highway",art:"highway"},
  {id:"ship",name:"Ship cabin",category:"Noise",type:"ship",art:"ship"},
  {id:"motor",name:"Distant motor",category:"Noise",type:"motor",art:"motor"},
  {id:"tape",name:"Tape hiss",category:"Noise",type:"tape",art:"tape"},
  {id:"vinyl",name:"Vinyl crackle",category:"Noise",type:"vinyl",art:"vinyl"},
  {id:"radio",name:"Radio static",category:"Noise",type:"radio",art:"radio"},
  {id:"rumble",name:"Low rumble",category:"Noise",type:"rumble",art:"rumble"},
  {id:"shush",name:"Soft shushing",category:"Noise",type:"shush",art:"shush"},
  {id:"air_wash",name:"Deep air wash",category:"Noise",type:"airwash",art:"air_wash"},
  {id:"drone",name:"Harmonic drone",category:"Meditation",type:"drone",art:"harmonic_drone"},
  {id:"frequency_tone",name:"Binaural beat",category:"Frequencies",type:"binaural",art:"tuning_fork"}
].map((item) => ({
  ...item,
  audio: item.file ? audio(item.file) : null,
  artwork: art(item.art || "moonlit_lake")
}));

export const moods = [
  {id:"sleep",name:"Sleep",tagline:"Slow down and drift",art:"night_forest",layers:[["night_forest",0.52],["brown",0.24]]},
  {id:"focus",name:"Focus",tagline:"Clear space for attention",art:"forest_stream",layers:[["stream",0.38],["pink",0.13]]},
  {id:"relax",name:"Relax",tagline:"Release the day",art:"campfire",layers:[["rain",0.34],["fire",0.2]]},
  {id:"meditate",name:"Meditate",tagline:"Find a little stillness",art:"singing_bowls",layers:[["medium_bowl",0.2],["wind",0.18]]},
  {id:"reset",name:"Reset",tagline:"Take a softer breath",art:"shoreline",layers:[["shoreline",0.35],["wind",0.12]]},
  {id:"nature",name:"Nature",tagline:"Step into the outdoors",art:"morning_forest",layers:[["morning_forest",0.3],["woodland_birds",0.2]]}
].map((mood) => ({...mood, artwork:art(mood.art)}));

export const categories = ["All sounds","Weather","Water","Nature","Meditation","Instruments","Noise","Frequencies"];

export const slideshowArt = [
  "rain","roof_rain","heavy_rain","thunder","snow_wind","wind","ocean","shoreline","forest_stream","river",
  "waterfall","night_pond","morning_forest","night_forest","meadow","mountain_breeze","woodland_birds","birds","frogs","crickets",
  "campfire","cicadas","owl","rainstick","bamboo_chimes","koshi_chimes","wind_chimes","gutter","singing_bowls","bronze_bowl",
  "crystal_bowl","high_bowl","gentle_gong","gong","tingsha","japanese_rin","monochord","tanpura","harmonium","handpan",
  "kalimba","tuning_fork","fork_128","fork_256","brown_noise","pink_noise","white_noise","blue_noise","violet_noise","grey_noise"
].map((name) => ({src:art(name), name:name.replaceAll("_"," ")}));

export const mediaAssets = Array.from(new Set([
  ...sounds.filter((sound) => sound.audio).map((sound) => sound.audio),
  ...sounds.map((sound) => sound.artwork),
  ...slideshowArt.map((slide) => slide.src)
]));

export function soundById(id) {
  return sounds.find((sound) => sound.id === id);
}
