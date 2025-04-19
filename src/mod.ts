/* eslint-disable @typescript-eslint/naming-convention */
import { DependencyContainer } from "tsyringe";
import { IPostDBLoadMod } from "@spt/models/external/IPostDBLoadMod";
import { IDatabaseTables } from "@spt/models/spt/server/IDatabaseTables";
import { DatabaseServer } from "@spt/servers/DatabaseServer";
import { ILogger } from "@spt/models/spt/utils/ILogger";
import { BaseClasses } from "@spt/models/enums/BaseClasses"; 
import { CustomItemService } from "@spt/services/mod/CustomItemService";
import { NewItemFromCloneDetails } from "@spt/models/spt/mod/NewItemDetails";

//Pistol Cartrides
import TTAmmoConfig from "../config/7.62x25mm_Tokarev/config.json";
import MagnumAmmoConfig from "../config/.357_Magnum/config.json";
import ACPAmmoConfig from "../config/.45_ACP/config.json";
import MAKAmmoConfig from "../config/9x18mm_Makarov/config.json";
import PARABELLUMAmmoConfig from "../config/9x19mm_Parabellum/config.json";
import GyurzaAmmoConfig from "../config/9x21mm_Gyurza/config.json";
import DeagleAmmoConfig from "../config/.50_AE/config.json"

//PDW Cartrides
import HKAmmoConfig from "../config/4.6x30mm_HK/config.json";
import FNAmmoConfig from "../config/5.7x28mm_FN/config.json";

//Rifle Cartrides
import BLKAmmoConfig from "../config/.300_Blackout/config.json";
import LapuaAmmoConfig from "../config/.338_Lapua_Magnum/config.json";
import TKMAmmoConfig from "../config/.366_TKM/config.json";
import AKAmmoConfig from "../config/5.45x39mm/config.json";
import NATOAmmoConfig from "../config/5.56x45mm_NATO/config.json";
import AKMAmmoConfig from "../config/7.62x39mm/config.json";
import BIGNATOAmmoConfig from "../config/7.62x51mm_NATO/config.json";
import RAmmoConfig from "../config/7.62x54mmR/config.json";
import VSSAmmoConfig from "../config/9x39mm/config.json";
import ASHAmmoConfig from "../config/12.7x55mm_STs-130/config.json";
import NSVAmmoConfig from "../config/12.7x108mm_NSV_HMG/config.json";

//Shotgun Cartrides
import KSAmmoConfig from "../config/23x75mm_SShell/config.json";
import TwelveGaugeAmmoConfig from "../config/12x70mm_SShell/config.json";
import TwentyGaugeAmmoConfig from "../config/20x70mm_SShell/config.json";

//Grenade Launcher Cartrides
import AGSAmmoConfig from "../config/30x29mm_GLauncher_AGS-30/config.json";
import GPAmmoConfig from "../config/40x53mm_Glauncher_GP-25/config.json";
import M203AmmoConfig from "../config/40x46mm_Glauncher_M203/config.json";

//Flare Cartrides
import FlareAmmoConfig from "../config/26x75mm_Flares/config.json";

//Special Cartidges
import BBAmmoConfig from "../config/6mmbb/config.json";
import TyrianAllInOneCartridge from "../config/TyrAllInOneCartridgeConfig.json";

class ComprehensiveAmmunitionTweaker implements IPostDBLoadMod 
{
    private logger: ILogger;
    private database: IDatabaseTables;
	
    //Pistol Cartrides
    private ACPmodConfig = ACPAmmoConfig;
    private MagnummodConfig = MagnumAmmoConfig;
    private TTmodConfig = TTAmmoConfig;
    private MAKmodConfig = MAKAmmoConfig;
    private PARABELLUMmodConfig = PARABELLUMAmmoConfig;
    private GYURZAmodConfig = GyurzaAmmoConfig;
    private DeaglemodConfig = DeagleAmmoConfig;
	
    //PDW Cartrides
    private HKmodConfig = HKAmmoConfig;
    private FNmodConfig = FNAmmoConfig;
	
    //Rifle Cartrides
    private BLKmodConfig = BLKAmmoConfig;
    private LapuamodConfig = LapuaAmmoConfig;
    private TKMmodConfig = TKMAmmoConfig;
    private AKmodConfig = AKAmmoConfig;
    private NATOmodConfig = NATOAmmoConfig;
    private AKMmodConfig = AKMAmmoConfig;
    private BIGNATOmodConfig = BIGNATOAmmoConfig;
    private RmodConfig = RAmmoConfig;
    private VSSmodConfig = VSSAmmoConfig;
    private ASHmodConfig = ASHAmmoConfig;
    private NSVmodConfig = NSVAmmoConfig;
	
    //Shotgun Cartrides
    private KSmodConfig = KSAmmoConfig;
    private TwelveGaugemodConfig = TwelveGaugeAmmoConfig;
    private TwentyGaugemodConfig = TwentyGaugeAmmoConfig;
	
    //Grenade Launcher Cartrides
    private AGSmodConfig = AGSAmmoConfig;
    private GPmodConfig = GPAmmoConfig;
    private M203modConfig = M203AmmoConfig;
	
    //Flare Cartrides
    private FlaremodConfig = FlareAmmoConfig;
	
    //Speecial Cartrides
    private BBmodConfig = BBAmmoConfig;
	
    private AmmoChanged = 0;
    private AmmoInTarkov = 0;

    private globalConfigs = {
        ...this.TTmodConfig,
        ...this.ACPmodConfig,
        ...this.MagnummodConfig,
        ...this.BLKmodConfig,
        ...this.LapuamodConfig,
        ...this.TKMmodConfig,
        ...this.HKmodConfig,
        ...this.FNmodConfig,
        ...this.AKmodConfig,
        ...this.NATOmodConfig,
        ...this.AKMmodConfig,
        ...this.BIGNATOmodConfig,
        ...this.RmodConfig,
        ...this.MAKmodConfig,
        ...this.PARABELLUMmodConfig,
        ...this.GYURZAmodConfig,
        ...this.DeaglemodConfig,
        ...this.VSSmodConfig,
        ...this.ASHmodConfig,
        ...this.NSVmodConfig,
        ...this.KSmodConfig,
        ...this.FlaremodConfig,
        ...this.AGSmodConfig,
        ...this.GPmodConfig,
        ...this.M203modConfig,
        ...this.TwelveGaugemodConfig,
        ...this.TwentyGaugemodConfig,
        ...this.BBmodConfig
    };
	
    public postDBLoad(container: DependencyContainer): void 
    {
        // Get database from server
        this.logger = container.resolve<ILogger>("WinstonLogger");
        this.database = container.resolve<DatabaseServer>("DatabaseServer").getTables();

        // Define ammo tableCartridges as a constant.
        const tableCartridges = ["patron_1143x23_acp", 
            "patron_1143x23_acp_ap", 
            "patron_1143x23_acp_hydra_shok", 
            "patron_1143x23_acp_lasermatch_fmj", 
            "patron_1143x23_rip", 
            "patron_762x35_blackout", 
            "patron_762x35_cbj",
            "patron_762x35_blackout_ap", 
            "patron_762x35_m62", 
            "patron_762x35_vmax", 
            "patron_762x35_whisper", 
            "patron_762x25tt_FMJ43", 
            "patron_762x25tt_LRN", 
            "patron_762x25tt_LRNPC", 
            "patron_762x25tt_P_Gl", 
            "patron_762x25tt_Pst_gzh", 
            "patron_762x25tt_T_Gzh", 
            "patron_762x25tt_akbs", 
            "patron_86x70_lapua_ap", 
            "patron_86x70_lapua_magnum", 
            "patron_86x70_lapua_tac_x", 
            "patron_86x70_lapua_magnum_upz", 
            "patron_9x33r_fmj", 
            "patron_9x33r_hp", 
            "patron_9x33r_jhp", 
            "patron_9x33r_sp", 
            "patron_366_custom_ap", 
            "patron_366_TKM_EKO", 
            "patron_366_TKM_FMJ", 
            "patron_366_TKM_Geksa", 
            "patron_46x30_action_sx", 
            "patron_46x30_ap_sx", 
            "patron_46x30_fmj_sx", 
            "patron_46x30_jsp",
            "patron_46x30_subsonic_sx", 
            "patron_57x28_l191", 
            "patron_57x28_r37f", 
            "patron_57x28_r37x", 
            "patron_57x28_sb193", 
            "patron_57x28_ss190", 
            "patron_57x28_ss197sr", 
            "patron_57x28_ss198lf", 
            "patron_545x39_7n39", 
            "patron_545x39_7n40", 
            "patron_545x39_BP", 
            "patron_545x39_BS", 
            "patron_545x39_BT", 
            "patron_545x39_FMJ", 
            "patron_545x39_HP", 
            "patron_545x39_PP", 
            "patron_545x39_PRS", 
            "patron_545x39_PS", 
            "patron_545x39_SP", 
            "patron_545x39_T", 
            "patron_545x39_US", 
            "patron_556x45_55_FMJ", 
            "patron_556x45_55_HP", 
            "patron_556x45_M855", 
            "patron_556x45_M855A1", 
            "patron_556x45_M856", 
            "patron_556x45_M856A1", 
            "patron_556x45_M995", 
            "patron_556x45_MK_255_Mod_0", 
            "patron_556x45_mk_318_mod_0",
            "patron_556x45_ssa_ap", 
            "patron_556x45_varmageddon",
            "patron_762x39_BP", 
            "patron_762x39_HP", 
            "patron_762x39_mai_ap",
            "patron_762x39_PS", 
            "patron_762x39_T45M", 
            "patron_762x39_US", 
            "patron_762x39_fmj",
            "patron_762x39_sp",
            "patron_762x39_pp",
            "patron_762x51_bpz_fmj", 
            "patron_762x51_M61", 
            "patron_762x51_M80", 
            "patron_762x51_ultra_nosler", 
            "patron_762x51_M62", 
            "patron_762x51_m993", 
            "patron_762x51_tpz_sp", 
            "patron_762х54R_7N1", 
            "patron_762x54r_7bt1", 
            "patron_762x54r_t46m",
            "patron_762х54R_LPS_Gzh",
            "patron_762x54r_7n37", 
            "patron_762х54R_SNB", 
            "patron_762х54r_fmj",
            "patron_762х54r_bthp",
            "patron_762х54r_spbt",
            "patron_9x18pm_BZT_gzh", 
            "patron_9x18pm_PBM", 
            "patron_9x18pm_PMM", 
            "patron_9x18pm_PPE_gzh",
            "patron_9x18pm_PPT_gzh", 
            "patron_9x18pm_PRS_gs",
            "patron_9x18pm_PSO_gzh",
            "patron_9x18pm_PST_gzh",
            "patron_9x18pm_PSV", 
            "patron_9x18pm_PS_gs_PPO", 
            "patron_9x18pm_P_gzh", 
            "patron_9x18pm_RG028_gzh", 
            "patron_9x18pm_SP7_gzh", 
            "patron_9x18pm_SP8_gzh", 
            "patron_9x19_GT", 
            "patron_9x19_luger_cci", 
            "patron_9x19_quakemaker", 
            "patron_9x19_rip", 
            "patron_9x19_7n31", 
            "patron_9x19_PSO_gzh", 
            "patron_9x19_PST_gzh", 
            "patron_9x19_ap_63", 
            "patron_9x19_m882",
            "patron_9x21_sp11", 
            "patron_9x21_sp12", 
            "patron_9x21_sp13", 
            "patron_9x21_sp10", 
            "patron_9x39_bp", 
            "patron_9x39_sp5", 
            "patron_9x39_pab9", 
            "patron_9x39_sp6", 
            "patron_9x39_spp", 
            "patron_127x55_ps12", 
            "patron_127x55_ps12a", 
            "patron_127x55_ps12b", 
            "patron_127x108", 
            "patron_127x108_bzt", 
            "patron_23x75_barricade", 
            "patron_23x75_shrapnel_10", 
            "patron_23x75_shrapnel_25", 
            "patron_23x75_star", 
            "patron_26x75_green", 
            "patron_26x75_red", 
            "patron_26x75_white", 
            "patron_26x75_yellow", 
            "patron_26x75_acidgreen", 
            "patron_30x29_vog_30", 
            "patron_40_VOG_25", 
            "patron_40x46_m381", 
            "patron_40x46_m386", 
            "patron_40x46_m406", 
            "patron_40x46_m433", 
            "patron_40x46_m441", 
            "patron_40x46_m576", 
            "patron_12x70_buckshot",
            "patron_12x70_piranha",
            "patron_12x70_buckshot_525", 
            "patron_12x70_buckshot_65", 
            "patron_12x70_buckshot_85", 
            "patron_12x70_dual_sabot_slug", 
            "patron_12x70_flechette", 
            "patron_12x70_rip", 
            "patron_12x70_slug", 
            "patron_12x70_slug_50_bmg_m17_traccer", 
            "patron_12x70_slug_ap_20", 
            "patron_12x70_slug_ftx_custom_lite", 
            "patron_12x70_slug_grizzly_40", 
            "patron_12x70_slug_hp_copper", 
            "patron_12x70_slug_poleva_3", 
            "patron_12x70_slug_poleva_6u", 
            "patron_12x70_slug_superformance", 
            "patron_20x70_buckshot", 
            "patron_20x70_buckshot_56", 
            "patron_20x70_buckshot_62", 
            "patron_20x70_buckshot_73", 
            "patron_20x70_slug_broadhead", 
            "patron_20x70_slug_poleva_3", 
            "patron_20x70_slug_poleva_6u", 
            "patron_20x70_slug_star", 
            "patron_127x33_fmj",
            "patron_127x33_jhp",
            "patron_127x33_cooper",
            "patron_127x33_jsp",
            "patron_6mm_airsoft"];
		
        this.logger.warning("\n[C.A.T] Processing Enabled Cartridges.");
		
        // Loop through the Cartridges defined.
        for (const Cartridge of tableCartridges) 
        {
            // Call the processBLKCartridges function, and perform the for loop in the function on the Cartridge specified.
            if (this.globalConfigs[Cartridge].Enabled)
            {
                this.processCartridges(Cartridge);
            }
        }
		
        if (this.AmmoChanged === 0)
        {
            this.logger.warning("\n[C.A.T] No Cartridges Are Enabled For Processing.");
        }
        if (this.AmmoChanged >= 1)
        {
            this.logger.warning(`\n[C.A.T] Finished Processing ${this.AmmoChanged} Enabled Cartridges.`);
        }
		
        const tyrCartEnabled = TyrianAllInOneCartridge.Enabled;
        const tyrCartBlinding = TyrianAllInOneCartridge.Blinding;
		
        if (tyrCartEnabled) 
        {
			
            this.logger.warning("\n[C.A.T] Processing Custom 'All In One' Cartridge.");
			
            const customItem = container.resolve<CustomItemService>("CustomItemService");
            const trader = this.database.traders;
            const items = this.database.templates.items;
			
            if (tyrCartBlinding === false) 
            {
                const TyrAllInOne: NewItemFromCloneDetails = {
                    itemTplToClone: "5e81f423763d9f754677bf2e",
                    overrideProperties: {
                        BackgroundColor: "violet",
						StackMaxSize: TyrianAllInOneCartridge.StackMaxSize,
                        Weight: TyrianAllInOneCartridge.Weight,
                        InitialSpeed: TyrianAllInOneCartridge.InitialSpeed,
                        Damage: TyrianAllInOneCartridge.Damage,
                        ammoAccr: TyrianAllInOneCartridge.ammoAccr,
                        ammoRec: TyrianAllInOneCartridge.ammoRec,
                        PenetrationPower: TyrianAllInOneCartridge.PenetrationPower,
                        ProjectileCount: TyrianAllInOneCartridge.ProjectileCount,
                        MisfireChance: TyrianAllInOneCartridge.MisfireChance,
                        MinFragmentsCount: TyrianAllInOneCartridge.MinFragmentsCount,
                        MaxFragmentsCount: TyrianAllInOneCartridge.MaxFragmentsCount,
                        FragmentationChance: TyrianAllInOneCartridge.FragmentationChance,
                        Tracer: TyrianAllInOneCartridge.Tracer,
                        TracerColor: TyrianAllInOneCartridge.TracerColor,
                        ArmorDamage: TyrianAllInOneCartridge.Weight,
                        StaminaBurnPerDamage: TyrianAllInOneCartridge.StaminaBurnPerDamage,
                        HeavyBleedingDelta: TyrianAllInOneCartridge.HeavyBleedingDelta,
                        LightBleedingDelta: TyrianAllInOneCartridge.LightBleedingDelta,
                        MalfMisfireChance: TyrianAllInOneCartridge.MalfMisfireChance,
                        DurabilityBurnModificator: TyrianAllInOneCartridge.DurabilityBurnModificator,
                        HeatFactor: TyrianAllInOneCartridge.HeatFactor,
                        MalfFeedChance: TyrianAllInOneCartridge.MalfFeedChance,
                        HasGrenaderComponent: TyrianAllInOneCartridge.HasGrenaderComponent,
                        FragmentsCount: TyrianAllInOneCartridge.FragmentsCount,
                        FragmentType: "5996f6d686f77467977ba6cc",
                        FuzeArmTimeSec: TyrianAllInOneCartridge.FuzeArmTimeSec,
                        ExplosionStrength: TyrianAllInOneCartridge.ExplosionStrength,
                        MinExplosionDistance: TyrianAllInOneCartridge.MinExplosionDistance,
                        MaxExplosionDistance: TyrianAllInOneCartridge.MaxExplosionDistance,
                        ExplosionType: "big_round_impact_explosive"
                    },
                    
                    newId: "67e320581f6bd18daca60634",
                    parentId: "5485a8684bdc2da71d8b4567",
                    handbookParentId: "5b47574386f77428ca22b33b",
                    fleaPriceRoubles: 1,
                    handbookPriceRoubles: 1,
                    locales: {
                        "en": {
                            name: "Tyrians All In One Special Ammo",
                            shortName: "TyrAmmo",
                            description: "A Super Special Ammo Type for All Weapons and Magazines."
                        }
                    }
                };
                customItem.createItemFromClone(TyrAllInOne);
            }
            if (tyrCartBlinding === true) 
            {
                const TyrAllInOne: NewItemFromCloneDetails = {
                    itemTplToClone: "5e81f423763d9f754677bf2e",
                    overrideProperties: {
                        BackgroundColor: "violet",
						StackMaxSize: TyrianAllInOneCartridge.StackMaxSize,
                        Weight: TyrianAllInOneCartridge.Weight,
                        InitialSpeed: TyrianAllInOneCartridge.InitialSpeed,
                        Damage: TyrianAllInOneCartridge.Damage,
                        ammoAccr: TyrianAllInOneCartridge.ammoAccr,
                        ammoRec: TyrianAllInOneCartridge.ammoRec,
                        PenetrationPower: TyrianAllInOneCartridge.PenetrationPower,
                        ProjectileCount: TyrianAllInOneCartridge.ProjectileCount,
                        MisfireChance: TyrianAllInOneCartridge.MisfireChance,
                        MinFragmentsCount: TyrianAllInOneCartridge.MinFragmentsCount,
                        MaxFragmentsCount: TyrianAllInOneCartridge.MaxFragmentsCount,
                        FragmentationChance: TyrianAllInOneCartridge.FragmentationChance,
                        Tracer: TyrianAllInOneCartridge.Tracer,
                        TracerColor: TyrianAllInOneCartridge.TracerColor,
                        ArmorDamage: TyrianAllInOneCartridge.Weight,
                        StaminaBurnPerDamage: TyrianAllInOneCartridge.StaminaBurnPerDamage,
                        HeavyBleedingDelta: TyrianAllInOneCartridge.HeavyBleedingDelta,
                        LightBleedingDelta: TyrianAllInOneCartridge.LightBleedingDelta,
                        MalfMisfireChance: TyrianAllInOneCartridge.MalfMisfireChance,
                        DurabilityBurnModificator: TyrianAllInOneCartridge.DurabilityBurnModificator,
                        HeatFactor: TyrianAllInOneCartridge.HeatFactor,
                        MalfFeedChance: TyrianAllInOneCartridge.MalfFeedChance,
                        HasGrenaderComponent: TyrianAllInOneCartridge.HasGrenaderComponent,
                        FragmentsCount: TyrianAllInOneCartridge.FragmentsCount,
                        FragmentType: "5996f6d686f77467977ba6cc",
                        FuzeArmTimeSec: TyrianAllInOneCartridge.FuzeArmTimeSec,
                        ExplosionStrength: TyrianAllInOneCartridge.ExplosionStrength,
                        MinExplosionDistance: TyrianAllInOneCartridge.MinExplosionDistance,
                        MaxExplosionDistance: TyrianAllInOneCartridge.MaxExplosionDistance,
                        ExplosionType: "big_round_impact_explosive",
                        Contusion:{"x":1.5, "y":4, "z":15},
                        Blindness:{"x":10, "y":20, "z":20}
                    },
                    newId: "67e320581f6bd18daca60634",
                    parentId: "5485a8684bdc2da71d8b4567",
                    handbookParentId: "5b47574386f77428ca22b33b",
                    fleaPriceRoubles: 1,
                    handbookPriceRoubles: 1,
                    locales: {
                        "en": {
                            name: "All In One Special Ammo",
                            shortName: "TyrAmmo",
                            description: "A Super Special Ammo Type for All Weapons and Magazines."
                        }
                    }
                };
                customItem.createItemFromClone(TyrAllInOne);
            }
			
            const prapor = trader["54cb50c76803fa8b248b4571"];
            const assort = prapor.assort;
			
            assort.items.push(
                {
                    _id: "67e320581f6bd18daca60634",
                    _tpl: "67e320581f6bd18daca60634",
                    parentId: "hideout",
                    slotId: "hideout",
                    upd: {
                        StackObjectsCount: 600000
                    }
                }
            );
            assort.loyal_level_items["67e320581f6bd18daca60634"] = 1;
            assort.barter_scheme["67e320581f6bd18daca60634"] = [
                [
                    {
                        _tpl: "5449016a4bdc2d6f028b456f",
                        count: 1
                    }
                ]
            ];

            for (const [_, item] of Object.entries(items)) 
            {
                if (this.isSet(item._parent) && this.isSet(item._props)) 
                {
                    if (this.isMagazine(item._id) && this.isSet(item._props.Cartridges)) 
                    {
                        const cylinderSlots = item._props.Slots.filter((slot) => slot._name.startsWith("camora"));
                        if (cylinderSlots.length > 0) 
                        {
                            for (const slot of cylinderSlots) 
                            {
                                slot._props.filters[0].Filter.push("67e320581f6bd18daca60634");
                            }
                        }

                        item._props.Cartridges[0]._props.filters[0].Filter.push("67e320581f6bd18daca60634");
                    }

                    if (this.isSet(item._props.Chambers)) 
                    {
                        for (const chamber of item._props.Chambers) 
                        {
                            chamber._props.filters[0].Filter.push("67e320581f6bd18daca60634");
                        }
                    }
                }
            }
        }
    }

    // This processes the ACPCartridges
    private processCartridges(Cartridge: string): void 
    {
        // Defining the items.json as a constant named 'items'.
        const items = this.database.templates.items;
        const mergedConfigs = this.globalConfigs;
		
        /* Looping through the TTCartridges in the TTmodConfig and applying configured values for each TTCartridge bullet.*/
        for (const [_, item] of Object.entries(items)) 
        {
            // Check the isAmmo public process below
            if (this.isAmmo(item._id)) 
            {
                const configExplosive = mergedConfigs[Cartridge]?.Explosive;
                const configBlinding = mergedConfigs[Cartridge].Blinding;
                const configTracer = mergedConfigs[Cartridge].Tracer;
                const CartridgeID = mergedConfigs[Cartridge].BulletID;
                if (item._id == CartridgeID) 
                {
					item._props.StackMaxSize = mergedConfigs[Cartridge].StackMaxSize;
                    item._props.Weight = mergedConfigs[Cartridge].Weight;
                    item._props.InitialSpeed = mergedConfigs[Cartridge].InitialSpeed;
                    item._props.Damage = mergedConfigs[Cartridge].Damage;
                    item._props.ammoAccr = mergedConfigs[Cartridge].ammoAccr;
                    item._props.ammoRec = mergedConfigs[Cartridge].ammoRec;
                    item._props.PenetrationPower = mergedConfigs[Cartridge].PenetrationPower;
                    item._props.ProjectileCount = mergedConfigs[Cartridge].ProjectileCount;
                    item._props.MisfireChance = mergedConfigs[Cartridge].MisfireChance;
                    item._props.MinFragmentsCount = mergedConfigs[Cartridge].MinFragmentsCount;
                    item._props.MaxFragmentsCount = mergedConfigs[Cartridge].MaxFragmentsCount;
                    item._props.FragmentationChance = mergedConfigs[Cartridge].FragmentationChance;
                    item._props.Tracer = mergedConfigs[Cartridge].Tracer;
                    item._props.TracerColor = mergedConfigs[Cartridge].TracerColor;
                    item._props.ArmorDamage = mergedConfigs[Cartridge].ArmorDamage;
                    item._props.StaminaBurnPerDamage = mergedConfigs[Cartridge].StaminaBurnPerDamage;
                    item._props.HeavyBleedingDelta = mergedConfigs[Cartridge].HeavyBleedingDelta;
                    item._props.LightBleedingDelta = mergedConfigs[Cartridge].LightBleedingDelta;
                    item._props.MalfMisfireChance = mergedConfigs[Cartridge].MalfMisfireChance;
                    item._props.DurabilityBurnModificator = mergedConfigs[Cartridge].DurabilityBurnModificator;
                    item._props.HeatFactor = mergedConfigs[Cartridge].HeatFactor;
                    item._props.MalfFeedChance = mergedConfigs[Cartridge].MalfFeedChance;
                    if (configTracer && item._props.TracerDistance == 0)
                    {
                        item._props.TracerDistance = 0.01;
                    }
                    if (configBlinding)
                    {
                        item._props.Blindness.x = 10;
                        item._props.Blindness.y = 20;
                        item._props.Blindness.z = 20;
                        item._props.Contusion.x = 1.5;
                        item._props.Contusion.y = 4;
                        item._props.Contusion.z = 15;
                    }
                    if (configExplosive >= 1) 
                    {
                        if (configExplosive == 1)
                        {
                            item._props.HasGrenaderComponent = true;
                            item._props.FragmentsCount = 2;
                            item._props.FragmentType = "5996f6d686f77467977ba6cc";
                            item._props.FuzeArmTimeSec = 0.02;
                            item._props.ExplosionStrength = 8;
                            item._props.MinExplosionDistance = 0.1;
                            item._props.MaxExplosionDistance = 1;
                            item._props.ExplosionType = "big_round_impact_explosive";
                        }
                        if (configExplosive == 2)
                        {
                            item._props.HasGrenaderComponent = true;
                            item._props.FragmentsCount = 15;
                            item._props.FragmentType = "63b35f281745dd52341e5da7";
                            item._props.FuzeArmTimeSec = 0.1;
                            item._props.ExplosionStrength = 80;
                            item._props.MinExplosionDistance = 1;
                            item._props.MaxExplosionDistance = 4.5;
                            item._props.ExplosionType = "smallgrenade_expl";
                        }
                    }
                    if (CartridgeID == "5d70e500a4b9364de70d38ce" || CartridgeID == "5656eb674bdc2d35148b457c" || CartridgeID == "5ede474b0c226a66f5402622" || CartridgeID == "5ede475b549eed7c6d5c18fb" || CartridgeID == "5ede4739e0350d05467f73e8" || CartridgeID == "5f0c892565703e5c461894e9" || CartridgeID == "5ede47405b097655935d7d16" || CartridgeID == "5ede475339ee016e8c534742")
                    {
                        if (CartridgeID != "5ede475339ee016e8c534742")
                        {
                            item._props.HasGrenaderComponent = true;
                        }
                        item._props.FragmentsCount = mergedConfigs[Cartridge].FragmentsCount;
                        item._props.FragmentType = "5485a8684bdc2da71d8b4567";
                        item._props.FuzeArmTimeSec = mergedConfigs[Cartridge].FuzeArmTimeSec;
                        item._props.ExplosionStrength = mergedConfigs[Cartridge].ExplosionStrength;
                        item._props.MinExplosionDistance = mergedConfigs[Cartridge].MinExplosionDistance;
                        item._props.MaxExplosionDistance = mergedConfigs[Cartridge].MaxExplosionDistance;
                        item._props.ExplosionType = "smallgrenade_expl";
                    }
                    ++this.AmmoChanged;
                }
            }
        }
    }

	
    //Below is used to check whether the item currently being checked is actually an ammo, make sure it's not undefined or another item. An extra layer to only check ammo for changes.
    public isAmmo(item: string): boolean 
    {
        const items = this.database.templates.items;
        if (this.isSet(items[item]._parent) && items[item]._parent === BaseClasses.AMMO ) 
        {
            return true;
        }
        return false;
    }
	
    public isMagazine(item: string): boolean 
    {
        const items = this.database.templates.items;
        if (this.isSet(items[item]._parent) && items[item]._parent === BaseClasses.MAGAZINE || items[item]._parent === BaseClasses.CYLINDER_MAGAZINE) 
        {
            return true;
        }
        return false;
    }
	
    public isSet(variable: any): boolean 
    {
        if (variable !== undefined && variable !== null) 
        {
            if (typeof variable === "string" && variable !== "") 
            {
                return true;
            }
            if (Array.isArray(variable) && variable.length > 0) 
            {
                return true;
            }
            if (typeof variable === "object" && !Array.isArray(variable) && Object.entries(variable).length > 0) 
            {
                return true;
            }
        }
        return false;
    }
	
}

module.exports = { mod: new ComprehensiveAmmunitionTweaker() };
