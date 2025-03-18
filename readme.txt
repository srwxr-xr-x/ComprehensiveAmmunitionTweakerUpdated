// Not all ammunition has a value for everything listed below, some even have unique values for them. But, here is a guide to help you with them.

        "Enabled": true, - This will determine whether or not the round is enabled or not for editing, without this set to 'true' nothing will change.
        "BulletID": ["5e81f423763d9f754677bf2e"], -- Leave this alone, do not edit it under any circumstances.
        "Weight": 0.015, -- Changes the weight of the round.
		"InitialSpeed": 340, -- Changes the speed of the round.
        "Damage": 72, -- Changes the damage of the round.
		"ammoAccr": 0, -- Changes the accuracy of the round, this is a percentage based value shown. A value of 10 is +10% accuracy, a -10 is -10% accuracy.
		"ammoRec": 0, -- Changes the recoil of the round, this is a percentage based value shown. A value of 10 is +10% recoil, a -10 is -10% recoil.
		"PenetrationPower": 25, -- This is the actual penetration value of a round, 10 pens class 1 armor, 50 pens class 5. So on and so forth.
		"ProjectileCount": 1, -- This determines how many projectiles that the round will fire.
        "MisfireChance": 0.03, -- Chance of the round misfiring in the chamber, 0 is pretty much no chance where as 1 is high chance. Values between 0 and 1 are used, mostly lower than 0.1
		"MinFragmentsCount": 1, -- Minimum amount of fragments the round will fragment into if it fragments.
		"MaxFragmentsCount": 1, -- Mmaximum amount of fragments the round will fragment into if it fragments.
		"FragmentationChance": 0.01, -- Chance of the round fragmenting on a hit, percentage based between 0 and 1, 0.01 is 1% chance of fragmenting.
		"Tracer": false, -- Enables or Disables Tracers on the ammo.
		"TracerColor": "red", -- Changes the tracer colours, red, green and yellow are confirmed to work. Some rounds may have other values.
		"ArmorDamage": 36, -- How much damage the round does to the armor itself.
		"StaminaBurnPerDamage": 0.2016, -- How much stamina you or your target loses upon being hit by this ammo.
		"HeavyBleedingDelta": 0, -- Percentage based value from 0 to 1, a value of 0.1 is a 10% chance to heavy bleed on being hit.
		"LightBleedingDelta": 0, -- Percentage based value from 0 to 1, a value of 0.1 is a 10% chance to light bleed on being hit.
		"MalfMisfireChance": 0.175, -- Chance of the round malfunctioning in the weapon and causing a jam after being fired, 0 is pretty much no chance where as 1 is high chance. Values between 0 and 1 are used, mostly lower than 0.1
		"DurabilityBurnModificator": 1, -- A value of 1 means that the round doesn't have an increased or decreased burn modifier, 0.9 means that the round will have a -10% burn modifier where as 1.1 has a +10% burn modifier. So on and so forth. Lower value is better for the weapon.
		"HeatFactor": 0.9963, -- How much heat the round generates, the lower the value the less heat it generates. I've seen values above 2 for this.
		"MalfFeedChance": 0.02, -- Chance of the round malfunctioning in the weapon and failing to feed, 0 is pretty much no chance where as 1 is high chance. Values between 0 and 1 are used, mostly lower than 0.1
		"Explosive": 0, -- A special config I've setup for ammo, a value of 0 means it isn't explosive, a value of 1 means it's a smol explosive similar to what one might expect out of an explosive round, while a value of 2 is pretty much grenade level explosive.
		"FragmentsCount": 15, -- Used on certain grenades and explosive ammo in particular, determines how many fragments the explosion creates.
		"FuzeArmTimeSec": 0.05, -- Used on certain grenades and explosive ammo in particular, determines how long it takes for the fuze to arm before it has a chance to explode. Means if you shoot it too close to yourself it won't explode, typically.
		"ExplosionStrength": 80, -- The strength of the explosion, I believe this is the damage the explosion causes to those within its distance.
		"MinExplosionDistance": 1, -- The minimum distance that the explosion has for it to cause damage.
		"MaxExplosionDistance": 4.5, -- The maximum distance that the explosion has for it to cause damage. Those outside this range do not take damage, though there's always the fragments. Not sure if they are limited by this value.
		"Blinding": false -- A special config I've setup for ammo, a value of false means the ammo will not stun or blind enemies, where as a value of true makes the round blind and stun enemies it hits.
