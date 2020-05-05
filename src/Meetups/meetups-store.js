import { writable } from 'svelte/store'

const meetups = writable([
  {
    id: 'm1',
    title: 'Coding Bootcamp',
    subtitle: 'Learn to code in 8 weeks',
    description: 'In this Bootcamp you will write your first line of code!',
    imageUrl:
      'https://cdn.pixabay.com/photo/2016/11/18/18/37/programming-1836330_1280.png',
    address: '5th Avenue Road, 323454 Los Angeles',
    contactEmail: 'code@test.com',
    isFavorite: false,
  },
  {
    id: 'm2',
    title: 'Karate Lessons',
    subtitle: 'Get your black belt',
    description: 'In this karate course you will learn to defend yourself!',
    imageUrl:
      'https://cdn.pixabay.com/photo/2019/02/17/17/11/karate-4002687_1280.png',
    address: '17th Middle Park, SE9 5HS London',
    contactEmail: 'karate@test.com',
    isFavorite: false,
  },
])

const customMeetupStore = {
  subscribe: meetups.subscribe,

  addMeetup: (meetupData) => {
    const newMeetup = {
      ...meetupData,
      id: Math.random().toString(),
      isFavorite: false,
    }
    meetups.update((items) => {
      return [newMeetup, ...items]
    })
  },

  updateMeetup: (id, meetupData) => {
    meetups.update((items) => {
      const meetupIndex = items.findIndex((i) => i.id === id)
      const updatedMeetup = { ...items[meetupIndex], ...meetupData }
      const updatedMeetups = [...items]
      updatedMeetups[meetupIndex] = updatedMeetup
      console.log(updatedMeetups, id)
      return updatedMeetups
    })
  },

  removeMeetup: (id) => {
    meetups.update((items) => {
      return items.filter((i) => i.id !== id)
    })
  },

  toggleFavorite: (id) => {
    meetups.update((items) => {
      const updatedMeetup = { ...items.find((meetup) => meetup.id === id) }
      updatedMeetup.isFavorite = !updatedMeetup.isFavorite
      const meetupIndex = items.findIndex((meetup) => meetup.id === id)
      const updatedMeetups = [...items]
      updatedMeetups[meetupIndex] = updatedMeetup
      return updatedMeetups
    })
  },
}

export default customMeetupStore
