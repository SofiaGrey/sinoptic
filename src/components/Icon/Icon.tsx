import type { FC, SVGProps } from 'react';
import type { IconType } from '../../types/types';

import {
	CloudyIcon,
	DrizzleIcon,
	FogIcon,
	HailIcon,
	HeavyRainIcon,
	HumidityIcon,
	LightRainIcon,
	MoonIcon,
	PartlyCloudyIcon,
	PartlyCloudyNightIcon,
	RainIcon,
	SnowFlakeIcon,
	SnowIcon,
	SunnyIcon,
	ThundershtormIcon,
	WindyIcon,
} from './Icons';

export interface IconProps extends SVGProps<SVGSVGElement> {
	name: IconType;
}

const config = {
	cloudy: CloudyIcon,
	drizzle: DrizzleIcon,
	fog: FogIcon,
	hail: HailIcon,
	heavyRain: HeavyRainIcon,
	humidity: HumidityIcon,
	lightRain: LightRainIcon,
	moon: MoonIcon,
	partlyCloudy: PartlyCloudyIcon,
	partlyCloudyNight: PartlyCloudyNightIcon,
	rain: RainIcon,
	snowflake: SnowFlakeIcon,
	snow: SnowIcon,
	sunny: SunnyIcon,
	thundershtorm: ThundershtormIcon,
	windy: WindyIcon,
};

export const Icon: FC<IconProps> = ({ name, ...props }) => {
	const SVGIcon = config[name];
	return <SVGIcon {...props} />;
};
