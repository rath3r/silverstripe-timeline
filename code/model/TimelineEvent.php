<?php

/**
 * Representation of an event within the timeline.
 * 
 * @author Thomas Meehan
 * @package timeline
 */
class TimelineEvent extends DataObject {

    /**
     * DB Columns
     * 
     * @var array
     * @config
     */
    static $db = array(
        'Title'         => 'Varchar(99)',
        'Content'       => 'HTMLText',
        'Year'          => 'Varchar(99)',
        'Sort'          => 'Int'
    );

    /**
     * Has One relations
     * 
     * @var array
     * @config
     */
    static $has_one = array(
        'Parent'    => 'Page',
        'Image'     => 'Image'
    );

    /**
     * Default sorting of this object
     * 
     * @var string
     * @config
     */
    static $default_sort = "Sort ASC";
    

    public function getCMSFields() {

        $fields = parent::getCMSFields();

        $fields->removeByName('ParentID');
        $fields->removeByName('Sort');

        $fields->addFieldsToTab('Root.Main', new HtmlEditorField('Content', 'Content'));

        $fields->addFieldToTab(
            'Root.Main',
            $uploadField = new UploadField(
                $name = 'Image',
                $title = 'Upload a timeline image:'
            )
        );
        $uploadField->setFolderName('timelineImages');

        return $fields;
    }

    public function getThumbnail() {
        if($this->Image())
            return $this->Image()->CMSThumbnail();
        else
            return '(No Image)';
    }
    
    /**
     * Check parent permissions
     *
     * @return Boolean
     */
    public function canView($member = null) {
        $extended = $this->extend('canView', $member);
        if($extended && $extended !== null) return $extended;

        return $this->Parent()->canView($member);
    }

    /**
     * Anyone can create a timeline event
     *
     * @return Boolean
     */
    public function canCreate($member = null) {
        $extended = $this->extend('canCreate', $member);
        if($extended && $extended !== null) return $extended;

        return true;
    }

    /**
     * Check parent permissions
     *
     * @return Boolean
     */
    public function canEdit($member = null) {
        $extended = $this->extend('canEdit', $member);
        if($extended && $extended !== null) return $extended;

        return $this->Parent()->canEdit($member);
    }

    /**
     * Check parent permissions
     *
     * @return Boolean
     */
    public function canDelete($member = null) {
        $extended = $this->extend('canDelete', $member);
        if($extended && $extended !== null) return $extended;

        return $this->Parent()->canEdit($member);
    }
}
