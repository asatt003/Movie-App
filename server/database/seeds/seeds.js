exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('movies').del()
      .then( () => {
        // Inserts seed entries
        return knex('movies').insert([
            {title: 'Mean Girls'},
            {title: 'Hackers'},
            {title: 'The Grey'},
            {title: 'Sunshine'},
            {title: 'Ex Machina'},
          ]);
      });
  };