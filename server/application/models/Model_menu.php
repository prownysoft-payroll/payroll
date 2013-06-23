<?php
	class Model_menu extends CI_Model
	{

		function __construct()
		{
			parent::__construct();
			$this->Model_login->is_already_login();
		}

		function get_role_and_access()
		{
			$sql = "select username,role, crud_golongan_kerja, crud_tunjangan
			from tbl_user where username=? and password=?";
			return $this->db->query($sql, array($this->session->userdata('username'), md5($this->session->userdata('password'))));
		}
	}
?>