exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('movies').del()
      .then( () => {
        // Inserts seed entries
        return knex('movies').insert([
            {title: 'Mean Girls', addedByUser: false, watched: false},
            {title: 'Hackers', addedByUser: false, watched: false},
            {title: 'The Grey', addedByUser: false, watched: false},
            {title: 'Sunshine', addedByUser: false, watched: false},
            {title: 'Ex Machina', addedByUser: false, watched: false}
          ]);
      });
  };