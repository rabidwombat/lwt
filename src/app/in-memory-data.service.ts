import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const customers = [
      {
        id: 1,
        firstName: "steve",
        lastName: "Piercy",
        address: "332 grand st",
        email: "steve@steve.com"
      },
      {
        id: 2,
        firstName: "john",
        lastName: "parsley",
        address: "234 styfe street, east lancing, mi",
        email: "hojen@johden.com"
      }
    ];

    const venues = [
      {
        id: 1,
        name: "first place",
        description: "sdfjkh kjhsdfkjhsdjkfh ksjdfh kjsdh fkjshd fkjshdfk sdhfkj:",
        address: "123 this place",
        url: "a.c.b.com",
        levels: [
          { id: 1, name: "main level", price: 20, numRows: 5, seatsPerRow: 10, seatingCapacity: 50 },
          { id: 2, name: "second level", price: 10, numRows: 10, seatsPerRow: 10, seatingCapacity: 100 }
        ],
        shows: [
          {
            id: 1,
            name: "bobo the clown",
            description: "bobo is a clown",
            url: "bobotheclown.com",
            performances: [
              { id: 111, showTime: "2018-01-18T21:00:00.000+0000", seatsAvailable: 140 },
              { id: 112, showTime: "2018-01-19T21:00:00.000+0000", seatsAvailable: 120 }
            ]
          },
          {
            id: 2,
            name: "jojo the clown",
            description: "jojo is a clown",
            url: "jojotheclown.com",
            performances: [
              { id: 115, showTime: "2018-01-20T21:00:00.000+0000", seatsAvailable: 140 },
              { id: 116, showTime: "2018-01-21T21:00:00.000+0000", seatsAvailable: 120 }
            ]
          }
        ]
      },
      {
        id: 2,
        name: "second place",
        description: "sdfjkh kjhsdfkjhsdjkfh ksjdfh kjsdh fkjshd fkjshdfk sdhfkj:",
        address: "123 that place",
        url: "foodles.com",
        levels: [
          { id: 10, name: "main level", price: 20, numRows: 5, seatsPerRow: 10, seatingCapacity: 50 },
          { id: 20, name: "second level", price: 10, numRows: 10, seatsPerRow: 10, seatingCapacity: 100 }
        ],
        shows: [
          {
            id: 3,
            name: "bobo the clown",
            description: "bobo is a clown",
            url: "bobotheclown.com",
            performances: [
              { id: 111, showTime: "2018-01-18T21:00:00.000+0000", seatsAvailable: 140 },
              { id: 112, showTime: "2018-01-19T21:00:00.000+0000", seatsAvailable: 120 }
            ]
          },
          {
            id: 4,
            name: "jojo the clown",
            description: "jojo is a clown",
            url: "jojotheclown.com",
            performances: [
              { id: 113, showTime: "2018-01-20T21:00:00.000+0000", seatsAvailable: 140 },
              { id: 114, showTime: "2018-01-21T21:00:00.000+0000", seatsAvailable: 120 }
            ]
          }
        ]
      }
    ]

    return {customers, venues};
  }
}
