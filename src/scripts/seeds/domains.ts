import { createConnection, ConnectionOptions } from 'typeorm';
import { configService } from '@config/config.service';
import { DomainEntity } from '@users/domains/entities/domain.entity';

export async function domainsSeed() {
  const opt = {
    ...configService.getTypeOrmConfig(),
    debug: true,
  };

  const connection = await createConnection(opt as ConnectionOptions);
  const domainService = connection.getRepository(DomainEntity);

  const work = [
    // Domain domains
    {
      name: 'Industrie automobile',
      type: 'sector',
      parent: 'EXPERTISE METIER',
    },
    {
      name: 'Industrie Textile',
      type: 'sector',
      parent: 'EXPERTISE METIER',
    },
    {
      name: 'Industrie du Cuir',
      type: 'sector',
      parent: 'EXPERTISE METIER',
    },
    {
      name: 'Industries des matèriaux de construction',
      type: 'sector',
      parent: 'EXPERTISE METIER',
    },
    {
      name: 'Industries minérales',
      type: 'sector',
      parent: 'EXPERTISE METIER',
    },
    // Role domains
    {
      name: 'Industries métallurgiques',
      type: 'sector',
      parent: 'EXPERTISE METIER',
    },
    {
      name: 'Industries mécaniques',
      type: 'sector',
      parent: 'EXPERTISE METIER',
    },
    {
      name: 'Industries électromécaniques',
      type: 'sector',
      parent: 'EXPERTISE METIER',
    },
    {
      name: 'Industrie chimique et parachimique',
      type: 'sector',
      parent: 'EXPERTISE METIER',
    },
    {
      name:
        'Industries de transformation et de valorisation des produits de la pêche',
      type: 'sector',
      parent: 'EXPERTISE METIER',
    },
    {
      name: 'Industries aéronautiques et saptiales',
      type: 'sector',
      parent: 'EXPERTISE METIER',
    },
    {
      name: 'Industries forestières, Arts graphiques et Emballages',
      type: 'sector',
      parent: 'EXPERTISE METIER',
    },
    {
      name: 'Industries plastiques',
      type: 'sector',
      parent: 'EXPERTISE METIER',
    },
    {
      name: 'Industrie culturelle',
      type: 'sector',
      parent: 'EXPERTISE METIER',
    },
    {
      name: 'Pêche, Aquaculture et Transformation du Poisson',
      type: 'sector',
      parent: 'EXPERTISE METIER',
    },
    {
      name: 'Production et Transformation du Lait',
      type: 'sector',
      parent: 'EXPERTISE METIER',
    },
    {
      name: 'Transformation des fruits et légumes',
      type: 'sector',
      parent: 'EXPERTISE METIER',
    },
    {
      name: 'Production des boissons',
      type: 'sector',
      parent: 'EXPERTISE METIER',
    },
    {
      name: 'Boulangerie, pain, pâtisserie et confiserie',
      type: 'sector',
      parent: 'EXPERTISE METIER',
    },
    {
      name: 'Transformation de la viande',
      type: 'sector',
      parent: 'EXPERTISE METIER',
    },
    {
      name: 'Energie',
      type: 'sector',
      parent: 'EXPERTISE METIER',
    },
    {
      name: 'Gestion de déchets et environnement',
      type: 'sector',
      parent: 'EXPERTISE METIER',
    },
    {
      name: 'Eaux',
      type: 'sector',
      parent: 'EXPERTISE METIER',
    },
    {
      name: 'Electronique',
      type: 'sector',
      parent: 'EXPERTISE METIER',
    },
    {
      name: 'Enseignement',
      type: 'sector',
      parent: 'EXPERTISE METIER',
    },
    {
      name: "Technologies de l'information",
      type: 'sector',
      parent: 'EXPERTISE METIER',
    },
    {
      name: 'Télecommunication',
      type: 'sector',
      parent: 'EXPERTISE METIER',
    },
    {
      name: 'Off-shoring',
      type: 'sector',
      parent: 'EXPERTISE METIER',
    },
    {
      name: 'Artisanat',
      type: 'sector',
      parent: 'EXPERTISE METIER',
    },
    {
      name: 'Bâtiment',
      type: 'sector',
      parent: 'EXPERTISE METIER',
    },
    {
      name: 'Carrières et Mines',
      type: 'sector',
      parent: 'EXPERTISE METIER',
    },
    {
      name: 'Promotion immobilière',
      type: 'sector',
      parent: 'EXPERTISE METIER',
    },
    {
      name: 'Commerce en réseau',
      type: 'sector',
      parent: 'EXPERTISE METIER',
    },
    {
      name: 'Commerce & Gestion de la chaine d’approvisionnement',
      type: 'sector',
      parent: 'EXPERTISE METIER',
    },
    {
      name:
        'Produits pharmaceutiques, produits à base de plantes et cosmétiques',
      type: 'sector',
      parent: 'EXPERTISE METIER',
    },
    {
      name: 'Services de Soins de Sante',
      type: 'sector',
      parent: 'EXPERTISE METIER',
    },
    {
      name: 'Hôtellerie et Tourisme',
      type: 'sector',
      parent: 'EXPERTISE METIER',
    },
    {
      name: 'Café, Restaurant, Hôtel',
      type: 'sector',
      parent: 'EXPERTISE METIER',
    },
    {
      name: 'Arboriculture, arbres fruitiers',
      type: 'sector',
      parent: 'EXPERTISE METIER',
    },
    {
      name: 'Floriculture, plantes à fleurs ornementales',
      type: 'sector',
      parent: 'EXPERTISE METIER',
    },
    {
      name: 'Maraîchage,culture légumière',
      type: 'sector',
      parent: 'EXPERTISE METIER',
    },
    {
      name: "Pépiniére,  végétaux d'extérieur",
      type: 'sector',
      parent: 'EXPERTISE METIER',
    },
    {
      name: 'Bovins laitiers, bovins de boucherie, moutons et caprins',
      type: 'sector',
      parent: 'EXPERTISE METIER',
    },
    {
      name: 'Aviculture',
      type: 'sector',
      parent: 'EXPERTISE METIER',
    },
    {
      name: 'Apiculture',
      type: 'sector',
      parent: 'EXPERTISE METIER',
    },
    {
      name: 'Minoterie',
      type: 'sector',
      parent: 'EXPERTISE METIER',
    },
    {
      name: 'Transport et Logistique',
      type: 'sector',
      parent: 'EXPERTISE METIER',
    },
    {
      name: 'Autre secteur',
      type: 'sector',
      parent: 'EXPERTISE METIER',
    },
    {
      name: "Faire un diagnostic de l'entreprise et du projet",
      type: 'service',
      parent: 'MARKETING ET COMMERCIAL',
    },
    {
      name: 'Analyser la clientèle et ses attentes',
      type: 'service',
      parent: 'MARKETING ET COMMERCIAL',
    },
    {
      name: 'Analyser  la concurrence',
      type: 'service',
      parent: 'MARKETING ET COMMERCIAL',
    },
    {
      name: 'Faire un analyse politique et reglementaire',
      type: 'service',
      parent: 'MARKETING ET COMMERCIAL',
    },
    {
      name: 'Faire une analyse économique',
      type: 'service',
      parent: 'MARKETING ET COMMERCIAL',
    },
    {
      name: 'Faire une analyse culturelle',
      type: 'service',
      parent: 'MARKETING ET COMMERCIAL',
    },
    {
      name: 'Faire une analyse démographique',
      type: 'service',
      parent: 'MARKETING ET COMMERCIAL',
    },
    {
      name: 'Faire une analyse  technologique',
      type: 'service',
      parent: 'MARKETING ET COMMERCIAL',
    },
    {
      name: 'Faire une analyse écologique',
      type: 'service',
      parent: 'MARKETING ET COMMERCIAL',
    },
    {
      name: 'Mettre en place une politique de produit ou de service',
      type: 'service',
      parent: 'MARKETING ET COMMERCIAL',
    },
    {
      name: 'Mettre en place une politique de prix',
      type: 'service',
      parent: 'MARKETING ET COMMERCIAL',
    },
    {
      name: 'Mettre en place une stratégie de communication',
      type: 'service',
      parent: 'MARKETING ET COMMERCIAL',
    },
    {
      name: 'Mettre en place une stratégie commerciale',
      type: 'service',
      parent: 'MARKETING ET COMMERCIAL',
    },
    {
      name: 'Financer son entreprise',
      type: 'service',
      parent: 'FINANCEMENT ET ASSURANCE',
    },
    {
      name: 'Financer sa croissance',
      type: 'service',
      parent: 'FINANCEMENT ET ASSURANCE',
    },
    {
      name: "Financer l'innovation",
      type: 'service',
      parent: 'FINANCEMENT ET ASSURANCE',
    },
    {
      name: 'Assurer son entreprise',
      type: 'service',
      parent: 'FINANCEMENT ET ASSURANCE',
    },
    {
      name: 'Rédiger les contrats obligatoires',
      type: 'service',
      parent: 'GESTION JURIDIQUE',
    },
    {
      name: 'Préparer les modèles de facture',
      type: 'service',
      parent: 'GESTION JURIDIQUE',
    },
    {
      name: 'Avoir des CGV et CGU et mentions légales en règles',
      type: 'service',
      parent: 'GESTION JURIDIQUE',
    },
    {
      name: 'Mettre en place les directives de la protection des données',
      type: 'service',
      parent: 'GESTION JURIDIQUE',
    },
    {
      name: 'Protéger la marque et les brevets.',
      type: 'service',
      parent: 'GESTION JURIDIQUE',
    },
    {
      name: 'Maîtriser les fondamentaux de la comptabilité',
      type: 'service',
      parent: 'GESTION COMPTABLE',
    },
    {
      name: 'Rester conforme aux obligations déclaratives fiscales',
      type: 'service',
      parent: 'GESTION COMPTABLE',
    },
    {
      name: "Vérifier les taux d'imposition et de TVA",
      type: 'service',
      parent: 'GESTION COMPTABLE',
    },
    {
      name: 'Mettre en place des protections pour éviter tout contrôle fiscal',
      type: 'service',
      parent: 'GESTION COMPTABLE',
    },
    {
      name:
        "Identifier et se mettre en conformité les aspects règlementaires spécifiques à l'activité ",
      type: 'service',
      parent: 'GESTION ADMINISTRATIVE',
    },
    {
      name:
        'Mettre également en place une gestion administrative dématérialisée',
      type: 'service',
      parent: 'GESTION ADMINISTRATIVE',
    },
    {
      name: 'Trouver le statut juridique le plus adapté',
      type: 'service',
      parent: 'GESTION ADMINISTRATIVE',
    },
    {
      name: 'Rester en conformité avec le droit du travail',
      type: 'service',
      parent: 'GESTION SOCIALE',
    },
    {
      name: 'Vous protéger en tant que dirigeant',
      type: 'service',
      parent: 'GESTION SOCIALE',
    },
    {
      name: 'Préparer le terrain légal pour des recrutements',
      type: 'service',
      parent: 'GESTION SOCIALE',
    },
    {
      name: 'Créer les budgets prévisionnels',
      type: 'service',
      parent: 'GESTION FINANCIERE',
    },
    {
      name: 'Piloter la trésorerie',
      type: 'service',
      parent: 'GESTION FINANCIERE',
    },
    {
      name: 'Garder le BFR au niveau le plus bas possible',
      type: 'service',
      parent: 'GESTION FINANCIERE',
    },
    {
      name: "Mettre en place des recours en cas d'impayés",
      type: 'service',
      parent: 'GESTION FINANCIERE',
    },
    {
      name: 'Gérer ses ressources humaines au quotidien',
      type: 'service',
      parent: 'GESTION DES RESSOURCES HUMAINES',
    },
    {
      name: 'Recruter pour son entreprise',
      type: 'service',
      parent: 'GESTION DES RESSOURCES HUMAINES',
    },
    {
      name: 'Devenir un leader',
      type: 'service',
      parent: 'MANAGEMENT ET LEADERSHIP',
    },
    {
      name: 'Manager ses émotions et sa productivité',
      type: 'service',
      parent: 'MANAGEMENT ET LEADERSHIP',
    },
    {
      name: 'Communiquer comme un professionnel',
      type: 'service',
      parent: 'MANAGEMENT ET LEADERSHIP',
    },
    {
      name: 'Evaluer la performance',
      type: 'service',
      parent: 'MANAGEMENT ET LEADERSHIP',
    },
    {
      name: 'Attirer les talents',
      type: 'service',
      parent: 'MANAGEMENT ET LEADERSHIP',
    },
    {
      name: 'Motiver ses équipes',
      type: 'service',
      parent: 'MANAGEMENT ET LEADERSHIP',
    },
    {
      name: 'Diriger et évaluer ses collaborateurs',
      type: 'service',
      parent: 'MANAGEMENT ET LEADERSHIP',
    },
    {
      name: 'Travailler en équipe',
      type: 'service',
      parent: 'MANAGEMENT ET LEADERSHIP',
    },
    {
      name: 'Renforcer sa visibilité en ligne',
      type: 'service',
      parent: 'DIGITAL',
    },
    {
      name: 'Diversifier ses canaux de vente',
      type: 'service',
      parent: 'DIGITAL',
    },
    {
      name: 'Prospecter en ligne',
      type: 'service',
      parent: 'DIGITAL',
    },
    {
      name: 'Fidéliser sa clientèle',
      type: 'service',
      parent: 'DIGITAL',
    },
    {
      name: 'Protéger son entreprise',
      type: 'service',
      parent: 'DIGITAL',
    },
  ].map((domain, index) =>
    domainService
      .save(domain)
      .then((r) => (console.log(`domain ${index} done ->`, r.name), r))
      .catch(() => console.log(`domain ${index} -> error`)),
  );

  await Promise.all(work);
  return await connection.close();
}
