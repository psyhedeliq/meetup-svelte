<script>
  import meetups from "./Meetups/meetups-store.js";
  import Header from "./UI/Header.svelte";
  import MeetupGrid from "./Meetups/MeetupGrid.svelte";
  import TextInput from "./UI/TextInput.svelte";
  import Button from "./UI/Button.svelte";
  import EditMeetup from "./Meetups/EditMeetup.svelte";
  import MeetupDetail from "./Meetups/MeetupDetail.svelte";
  import LoadingSpinner from "./UI/LoadingSpinner.svelte";
  import Error from "./UI/Error.svelte";

  // let meetups = ;

  let editMode;
  let editedId;
  let page = "overview";
  let pageData = {};
  let isLoading = true;
  let error;

  fetch("https://svelte-rest-api.firebaseio.com/meetups.json")
    .then(res => {
      if (!res.ok) {
        throw new Error(
          "Oooops, fetching meetups failed! Please try again later!"
        );
      }
      return res.json();
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
      // we do the setTimeout deliberatly to slow things down so we can add a loading spinner
      setTimeout(() => {
        isLoading = false;
        meetups.setMeetups(loadedMeetups.reverse());
      }, 1000);
    })
    .catch(err => {
      error = err;
      isLoading = false;
      console.log(err);
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

  const clearError = () => {
    error = null;
  };
</script>

<style>
  main {
    margin-top: 5rem;
  }
</style>

{#if error}
  <Error message={error.message} on:cancel={clearError} />
{/if}

<Header />

<main>
  {#if page === 'overview'}
    {#if editMode === 'edit'}
      <EditMeetup id={editedId} on:save={savedMeetup} on:cancel={cancelEdit} />
    {/if}

    {#if isLoading}
      <LoadingSpinner />
    {:else}
      <MeetupGrid
        meetups={$meetups}
        on:showdetails={showDetails}
        on:edit={startEdit}
        on:add={() => {
          editMode = 'edit';
        }} />
    {/if}
  {:else}
    <MeetupDetail id={pageData.id} on:close={closeDetails} />
  {/if}
</main>
