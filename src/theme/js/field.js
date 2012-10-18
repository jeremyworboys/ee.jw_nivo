// Generated by CoffeeScript 1.3.3
(function() {

  $(function() {
    var $nivo_empty, $nivo_field, $nivo_table, $nivo_templ, $slide_count, update_field_names;
    $nivo_field = $('.js-nivo-table').closest('.holder');
    $nivo_table = $('.js-nivo-table tbody');
    $nivo_templ = $('.js-nivo-slide-template');
    $nivo_empty = $('.js-nivo-no-slides');
    $slide_count = $('[name=slide_count]');
    $('.js-nivo-add-slide').on('click', function(e) {
      var $file_field, $new_row, file_field, row_id;
      e.preventDefault();
      $nivo_empty.addClass('is-hidden');
      $new_row = $nivo_templ.clone().appendTo($nivo_table).removeClass('js-nivo-slide-template').addClass('js-nivo-slide');
      row_id = $('.js-nivo-slide', $nivo_table).length;
      $slide_count.val(row_id);
      $('[name]', $new_row).each(function(i) {
        var $field;
        $field = $(this);
        return $field.attr('name', $field.attr('name').replace('#', row_id));
      });
      file_field = "slide_image_" + row_id;
      $file_field = $(file_field);
      $.ee_filebrowser.add_trigger($('.choose_file', $new_row), file_field, {
        content_type: $file_field.data('content-type'),
        directory: $file_field.data('directory')
      }, function(file, field) {
        var $field_dir, $field_file, $thumb, directory, name, thumb;
        directory = file.upload_location_id;
        name = file.file_name;
        thumb = file.thumb;
        $thumb = $('.file_set', $new_row);
        $field_dir = $("[name=" + file_field + "_hidden_dir]");
        $field_file = $("[name=" + file_field + "_hidden]");
        if (!(directory && name)) {
          return;
        }
        $field_dir.val(directory);
        $field_file.val(name);
        $('.remove_file', $new_row).on('click', function(e) {
          $thumb.addClass('js_hide');
          $field_dir.val('');
          return $field_file.val('');
        });
        $('img', $thumb).attr('src', thumb);
        return $thumb.removeClass('js_hide');
      });
      $new_row.removeClass('is-hidden');
      return false;
    });
    $nivo_table.on('click', '.js-nivo-remove-slide', function(e) {
      e.preventDefault();
      $(this).closest('.js-nivo-slide').remove();
      $slide_count.val($('.js-nivo-slide', $nivo_table).length);
      if (!$('.js-nivo-slide').length) {
        $nivo_empty.removeClass('is-hidden');
      } else {
        update_field_names();
      }
      return false;
    });
    if ($nivo_table.length > 0) {
      $nivo_table.tableDnD({
        dragHandle: '.js-reorder-handle',
        onDragClass: 'is-dragging',
        onDrop: function() {
          return update_field_names();
        }
      });
    }
    $('#publishForm').on('submit', function(e) {
      return $nivo_templ.remove();
    });
    update_field_names = function() {
      var count;
      count = 0;
      return $('.js-nivo-slide', $nivo_table).each(function(i) {
        $(this).data('index', i + 1);
        return $('[name]', $(this)).each(function(j) {
          var $field;
          $field = $(this);
          return $field.attr('name', $field.attr('name').replace(/\d+/, i + 1));
        });
      });
    };
    update_field_names();
    $('.js-nivo-field-label').on('click', function(e) {
      var $img, $label;
      $label = $(this);
      $img = $('img', $label);
      if ($img.attr('src').indexOf('field_collapse') > 0) {
        $img.attr('src', $img.attr('src').replace('field_collapse', 'field_expand'));
        return $label.next('.js-nivo-field-pane').slideDown();
      } else {
        $img.attr('src', $img.attr('src').replace('field_expand', 'field_collapse'));
        return $label.next('.js-nivo-field-pane').slideUp();
      }
    });
    return $('[data-condition]').each(function(i) {
      var $target, $td, $tr, re, target, val, _ref;
      $td = $(this);
      $tr = $td.closest('tr');
      _ref = $td.data('condition').split('='), target = _ref[0], val = _ref[1];
      $target = $("[name='" + target + "']");
      re = new RegExp("^" + val);
      $target.on("change.id_" + i, function(e) {
        if ($target.is('select')) {
          val = $target.val();
        } else if ($target.attr('type') === 'radio') {
          val = $target.filter(':checked').val();
        }
        if (re.test(val)) {
          return $tr.show();
        } else {
          return $tr.hide();
        }
      });
      return $target.trigger("change.id_" + i);
    });
  });

}).call(this);
