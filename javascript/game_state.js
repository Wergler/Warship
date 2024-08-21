export const gameState = {
  players: [
    {
      name: "player",
      ships: [
        {
          type: "destroyer",
          cells: [
            {
              is_hit: false,
              position: "B9",
              hidden_letter: "m"
            },
            {
              is_hit: false,
              position: "E9",
              hidden_letter: "e"
            }
          ],
          alignment: "vertical"
        }
      ],

      guesses: [
        "B1",
        "E6"
      ]



    },
    {
      name: "player2"
    }
  ]
}