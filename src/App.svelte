<script>
  import meetups from "./Meetups/meetups-store.js";
  import Header from "./UI/Header.svelte";
  import MeetupGrid from "./Meetups/MeetupGrid.svelte";
  import TextInput from "./UI/TextInput.svelte";
  import Button from "./UI/Button.svelte";
  import EditMeetup from "./Meetups/EditMeetup.svelte";
  import MeetupDetail from "./Meetups/MeetupDetail.svelte";

  // let meetups = ;

  let editMode;
  let editedId;
  let page = "overview";
  let pageData = {};

  fetch("https://svelte-rest-api.firebaseio.com/meetups.json")
    .then(response => {
      if (!response.ok) {
        throw new Error(
          "Oooops, fetching meetups failed! Please try again later!"
        );
      }
      return response.json();
    })
    .then(data => {
      // console.log(data);
      const loadedMeetups = [];
      for (let key in data) {
        loadedMeetups.push({
          ...data[key],
          id: key
        });
      }
      meetups.setMeetups(loadedMeetups);
    })
    .catch(error => {
      console.log(error);
    });

  const savedMeetup = event => {
    // console.log(event);
    editMode = null;
    editedId = null;
  };

  const cancelEdit = () => {
    editMode = null;
    editedId = null;
  };

  const showDetails = event => {
    page = "details";
    pageData.id = event.detail;
  };

  const closeDetails = () => {
    page = "overview";
    // reset the page data, remove the id property so to say
    pageData = {};
  };

  const startEdit = event => {
    editMode = "edit";
    editedId = event.detail;
  };
</script>

<style>
  main {
    margin-top: 5rem;
  }
</style>

<Header />

<main>
  {#if page === 'overview'}
    {#if editMode === 'edit'}
      <EditMeetup id={editedId} on:save={savedMeetup} on:cancel={cancelEdit} />
    {/if}
    <MeetupGrid
      meetups={$meetups}
      on:showdetails={showDetails}
      on:edit={startEdit}
      on:add={() => {
        editMode = 'edit';
      }} />
  {:else}
    <MeetupDetail id={pageData.id} on:close={closeDetails} />
  {/if}
</main>
