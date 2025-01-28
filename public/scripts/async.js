$(()=> {
    console.log( "ready!" );

    $('#blog').on('change keyup',()=>{

      console.log($('#blog').val()); 
      
      let blogVal = $('#blog').val(); 
      // $.post('/async2', { blog: blogVal }); 

      $.ajax({
          url: 'async2',
          type: 'post',
          dataType: 'json',
          data: { blog: blogVal },
          success: function(data) {
                    console.log('data', data); 
                  }
        });



    })
});


