exports.BattleFormats = {
	
	// formats
	
	RandomBattle: {
		effectType: 'Format',
		name: "Random Battle",
		team: 'random',
		searchDefault: true,
		ranked: true,
		challengeShow: true,
		searchShow: true,
		ruleset: ['Pokemon','PotD', 'SleepClause']
	},
	UnrankedRandomBattle: {
		effectType: 'Format',
		name: "Unranked Random Battle",
		team: 'random',
		searchShow: true,
		ruleset: ['Pokemon','PotD', 'SleepClause']
	},
	OU: {
		effectType: 'Format',
		name: "OU",
		challengeDefault: true,
		ranked: true,
		challengeShow: true,
		searchShow: true,
		isTeambuilderFormat: true,
		ruleset: ['SleepClause', 'SpeciesClause', 'Standard', 'TeamPreview'],
		banlist: ['Pokemon','SpeciesClause','Standard', 'Uber', 'G4CAP','G5CAP', 'Drizzle ++ SwiftSwim']
	},
	CAP: {
		effectType: 'Format',
		name: "CAP",
		ranked: true,
		challengeShow: true,
		searchShow: true,
		isTeambuilderFormat: true,
		ruleset: ['SleepClause', 'SpeciesClause', 'Standard', 'TeamPreview'],
		banlist: ['Pokemon','SpeciesClause','Standard','Uber']
	},
	CAPNecturnaPlaytest: {
		effectType: 'Format',
		name: "CAP Necturna Playtest",
		ranked: true,
		ruleset: ['SleepClause', 'SpeciesClause', 'Standard', 'TeamPreview'],
		banlist: ['Pokemon','SpeciesClause','Standard','Uber','G4CAP','Tomohawk','ShadowStrike','PaleoWave']
	},
	Ubers: {
		effectType: 'Format',
		name: "Ubers",
		ranked: true,
		challengeShow: true,
		searchShow: true,
		isTeambuilderFormat: true,
		ruleset: ['SleepClause', 'SpeciesClause', 'Standard', 'TeamPreview'],
		banlist: ['Pokemon','SpeciesClause','Standard','G4CAP','G5CAP']
	},
	UU: {
		effectType: 'Format',
		name: "UU",
		ranked: true,
		challengeShow: true,
		searchShow: true,
		isTeambuilderFormat: true,
		ruleset: ['SleepClause', 'SpeciesClause', 'Standard', 'TeamPreview'],
		banlist: ['Pokemon','SpeciesClause','Standard','Uber','OU','BL','G4CAP','G5CAP', 'SnowWarning','Drought']
	},
	RU: {
		effectType: 'Format',
		name: "RU",
		ranked: true,
		challengeShow: true,
		searchShow: true,
		isTeambuilderFormat: true,
		ruleset: ['SleepClause', 'SpeciesClause', 'Standard', 'TeamPreview'],
		banlist: ['Pokemon','SpeciesClause','Standard','Uber','OU','BL','UU','BL2','G4CAP','G5CAP', 'ShellSmash + BatonPass']
	},
	NU: {
		effectType: 'Format',
		name: "NU",
		ranked: true,
		challengeShow: true,
		searchShow: true,
		isTeambuilderFormat: true,
		ruleset: ['SleepClause', 'SpeciesClause', 'Standard', 'TeamPreview'],
		banlist: ['Pokemon','SpeciesClause','Standard','Uber','OU','BL','UU','BL2','RU','BL3','G4CAP','G5CAP']
	},
	Hackmons: {
		effectType: 'Format',
		name: "Hackmons",
		challengeShow: true,
		isTeambuilderFormat: true,
		ruleset: [],
		banlist: ['Pokemon','G4CAP','G5CAP']
	},
	BalancedHackmons: {
		effectType: 'Format',
		name: "Balanced Hackmons",
		ranked: true,
		challengeShow: true,
		searchShow: true,
		teambuilderFormat: 'Hackmons',
		ruleset: [],
		banlist: ['Pokemon','OHKO', 'WonderGuard', 'G4CAP','G5CAP']
	},
	Haxmons: {
		effectType: 'Format',
		name: "Haxmons",
		ruleset: ['HaxClause', 'TeamPreview', 'G4CAP','G5CAP']
	},
	DebugMode: {
		effectType: 'Format',
		name: "Debug Mode",
		challengeShow: true,
		canUseRandomTeam: true,
		// no restrictions, for serious
		ruleset: []
	},
	
	// rules
	
	Standard: {
		effectType: 'Banlist',
		banlist: ['Unreleased', 'Illegal', 'OHKO', 'Moody', 'BrightPowder', 'LaxIncense', 'Minimize', 'DoubleTeam', 'Legal'],
		validateSet: function(set) {
			// limit one of each move in Standard
			var moves = [];
			if (set.moves)
			{
				var hasMove = {};
				for (var i=0; i<set.moves.length; i++)
				{
					var move = this.getMove(set.moves[i]);
					var moveid = move.id;
					if (hasMove[moveid]) continue;
					hasMove[moveid] = true;
					moves.push(set.moves[i]);
				}
			}
			set.moves = moves;
		}
	},
	Pokemon: {
		effectType: 'Banlist',
		validateSet: function(set) {
			var item = this.getItem(set.item);
			var template = this.getTemplate(set.species);
			
			if (template.num == 493) // Arceus
			{
				if (template.ability === 'Multitype' && item.onPlate)
				{
					set.species = 'Arceus-'+item.onPlate;
				}
				else
				{
					set.species = 'Arceus';
				}
			}
			if (template.num == 487) // Giratina
			{
				if (item.id === 'GriseousOrb')
				{
					set.species = 'Giratina-O';
				}
				else
				{
					set.species = 'Giratina';
				}
			}
			if (template.num == 555) // Darmanitan
			{
				set.species = 'Darmanitan';
			}
			if (template.num == 648) // Meloetta
			{
				set.species = 'Meloetta';
			}
			if (template.num == 351) // Castform
			{
				set.species = 'Castform';
			}
			if (template.num == 421) // Cherrim
			{
				set.species = 'Cherrim';
			}
		}
	},
	Legal: {
		effectType: 'Banlist',
		banlist: ['Crobat+BraveBird+Hypnosis']
	},
	PotD: {
		effectType: 'Rule',
		onPotD: '',
		onStart: function() {
			if (this.effect.onPotD)
			{
				this.add('rule Pokemon of the Day: '+this.effect.onPotD);
			}
		}
	},
	TeamPreview: {
		onStartPriority: -10,
		onStart: function() {
			for (var i=0; i<this.sides[0].pokemon.length; i++)
			{
				this.add('pokemon '+this.sides[0].pokemon[i].tpid);
			}
			for (var i=0; i<this.sides[1].pokemon.length; i++)
			{
				this.add('pokemon '+this.sides[1].pokemon[i].tpid);
			}
		},
		onTeamPreview: function() {
			this.callback('team-preview');
		}
	},
	HaxClause: {
		effectType: 'Rule',
		onStart: function() {
			this.add('rule Hax Clause');
		},
		onModifyMovePriority: -100,
		onModifyMove: function(move) {
			if (move.secondary)
			{
				move.secondary.chance = 100;
			}
			if (move.accuracy !== true && move.accuracy <= 99)
			{
				move.accuracy = 0;
			}
			move.willCrit = true;
		}
	},
	SpeciesClause: {
		effectType: 'Rule',
		onStart: function() {
			this.add('rule Species Clause');
		},
		validateTeam: function(team, format) {
			var speciesTable = {};
			for (var i=0; i<team.length; i++) {
				var template = this.getTemplate(team[i].species);
				if (speciesTable[template.num]) {
					return [template.name+" is banned by Species Clause."];
				}
				speciesTable[template.num] = true;
			}
		}
	},
	SleepClause: {
		effectType: 'Rule',
		onStart: function() {
			this.add('rule Sleep Clause');
		},
		onSetStatus: function(status, target, source) {
			if (source && source.side === target.side)
			{
				return;
			}
			if (status.id === 'slp')
			{
				for (var i=0; i<target.side.pokemon.length; i++)
				{
					var pokemon = target.side.pokemon[i];
					if (pokemon.status === 'slp')
					{
						if (!pokemon.statusData.source ||
						    pokemon.statusData.source.side !== pokemon.side)
						{
							this.add('message Sleep Clause activated.');
							return false;
						}
					}
				}
			}
		}
	},
	FreezeClause: {
		effectType: 'Rule',
		onStart: function() {
			this.add('rule Freeze Clause');
		}
	}
};