<script>
  import Header from "./UI/Header.svelte";
  import MeetupItem from "./Meetups/MeetupItem.svelte";

  const meetups = [
    {
      id: "m1",
      title: "Coding Bootcamp",
      subtitle: "Learn to code in 8 weeks",
      description:
        "In this meetup we will have some experts that teach you how to code!",
      imageUrl:
        "https://cdn.pixabay.com/photo/2016/09/08/04/12/programmer-1653351_1280.png",
      address: "5th Avenue Road, 323454 Los Angeles",
      contact: "code@test.com"
    },
    {
      id: "m2",
      title: "Karate Lessons",
      subtitle: "Get your black belt",
      description: "In this karate course you will learn to defend yourself!",
      imageUrl:
        "https://cdn.pixabay.com/photo/2017/11/21/12/45/karate-2968106_1280.jpg",
      address: "17th Middle Park, SE9 5HS London",
      contact: "karate@test.com"
    }
  ];
</script>

<style>
  #meetups {
    margin-top: 5rem;
  }
</style>

<Header />

<section id="meetups">
  {#each meetups as meetup}
    <MeetupItem
      title={meetup.title}
      subtitle={meetup.subtitle}
      description={meetup.description}
      imageUrl={meetup.imageUrl}
      email={meetup.contactEmail}
      address={meetup.address} />
  {/each}
</section>
