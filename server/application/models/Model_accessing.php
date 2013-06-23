<?php
	class Model_accessing extends CI_Model
	{

		function __construct()
		{
			parent::__construct();
			$this->Model_login->is_already_login();
		}

		function get_role()
		{
			$username = $this->session->userdata('username');
			$password = $this->session->userdata('password');
			$sql = "select username, role from tbl_user from where username=? and password=?";
			return $this->db->query($sql, array($username, md5($password)));
		}

		function get_role_and_access()
		{
			$username = $this->session->userdata('username');
			$password = $this->session->userdata('password');
			$sql = "select * from view_get_role_and_access from where username=? and password=?";
			$result = $this->db->query($sql, array($username, md5($password)));
			return ($result->num_rows())?TRUE:FALSE;
		}
	}
?>